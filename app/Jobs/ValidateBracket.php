<?php

namespace App\Jobs;

use App\Strategies\IValidateBracketStrategy;

use Log;
use App\Jobs\Job;
use Illuminate\Http\Request;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ValidateBracket extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $strategy;
    protected $request;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Request $req, IValidateBracketStrategy $strat)
    {
        $this->request = $req;
        $this->strategy = $strat;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $errors = BracketFactory::validateBracket($this->$request,$this->strategy);
        if ($errors->count() > 0) {
            Log::info($errors);
        }
    }
}
