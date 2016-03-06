<?php

namespace App\Jobs;

use App\Strategies\IValidateBracketStrategy;
use App\Strategies\ICreateBracketStrategy;
use App\Factories\BracketFactory;

use Log;
use DB;
use App\Jobs\Job;
use Illuminate\Http\Request;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ValidateBracket extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $validateStrategy;
    protected $createStrategy;
    protected $existingBracket;
    protected $request;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($req, IValidateBracketStrategy $validate, ICreateBracketStrategy $create, $bracket)
    {
        Log::info("Creating new Bracket Job");
        $this->request = collect($req->all());
        $this->createStrategy = $create;
        $this->validateStrategy = $validate;
        $this->existingBracket = $bracket;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::debug("Running Bracket Job");
        $errors = BracketFactory::validateBracket($this->request, $this->validateStrategy);
        if ($errors->count() > 0) {
            Log::info($errors);
        } else {

            DB::beginTransaction();

            $bracket = BracketFactory::createBracket($this->request, $this->createStrategy);

            if (isset($bracket)) {
                $bracket->name = $this->request->get('name');
                $bracket->user_id = $this->request->get('user_id');
                $bracket->save();
                if(isset($this->existingBracket)) {
                    $this->existingBracket->delete();
                }
                DB::commit();
                $alert = [
                    'message' => 'Save successful',
                    'level' => 'success'
                ];
            } else {
                DB::rollBack();
                $alert = [
                    'message' => 'Save unsuccessful',
                    'level' => 'danger'
                ];
            }
            Log::info($alert);

        }
    }
}
