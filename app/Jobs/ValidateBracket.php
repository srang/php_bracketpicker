<?php

namespace App\Jobs;

use App\Strategies\IValidateBracketStrategy;
use App\Strategies\ICreateBracketStrategy;
use App\Factories\BracketFactory;
use App\Task;

use Log;
use DB;
use Auth;
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
    protected $task;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($req, IValidateBracketStrategy $validate, ICreateBracketStrategy $create, $bracket=NULL)
    {
        Log::info("Creating new Bracket Job");
        $this->request = collect($req->all());
        $this->request->put('auth_user',Auth::user());
        $this->createStrategy = $create;
        $this->validateStrategy = $validate;
        $this->existingBracket = $bracket;
        if(!empty($req->user_id)) {
            $t = new Task([
                'name' => $req->name,
                'user_id' => $req->user_id,
            ]);
            if(!empty($req->bracket_id)) {
                $t->bracket_id = $req->bracket_id;
            }
            $t->save();
            $this->task = $t;
        }
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
            if (isset($this->task)) {
                $this->task->delete();
            }
            $alert = BracketFactory::createBracket($this->request, $this->createStrategy);
            Log::info($alert['message']);
        }
    }


    /**
     * Handle a job failure.
     *
     * @return void
     */
    public function failed()
    {
        $user_id = $this->request->get('user_id');
        $user = User::where('user_id',$user_id);
        if (!isset($user)) {
            //mail admin
            Log::info('Task '.$this->task->task_id.' failed and no user set');
        } else {
            Log::info('Task '.$this->task->task_id.' failed and user will be notified');
            //mail user and/or admin
        }
        $this->task->delete();
    }
}
