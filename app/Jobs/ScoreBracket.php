<?php

namespace App\Jobs;

use App\Strategies\IScoreRulesetStrategy;
use App\Factories\BracketFactory;
use App\Task;
use App\Bracket;

use Log;
use DB;
use Auth;
use App\Jobs\Job;
use Illuminate\Http\Request;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class ScoreBracket extends Job implements ShouldQueue
{
    use InteractsWithQueue, SerializesModels;

    protected $scoreStrategy;
    protected $bracket;
    protected $ruleset;
    protected $task;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(IScoreRulesetStrategy $score, Bracket $bracket)
    {
        Log::info("Creating new Score Job");
        $this->scoreStrategy = $score;
        $this->bracket = $bracket;
        $t = new Task([
            'name' => 'Scoring '.$bracket->name,
            'user_id' => $bracket->user_id,
            'bracket_id'=> $bracket->bracket_id
        ]);
        $t->save();
        $this->task = $t;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Log::debug("Running Score Job");
        $score = BracketFactory::scoreBracket($this->bracket, $this->scoreStrategy);
        $this->task->delete();
    }


    /**
     * Handle a job failure.
     *
     * @return void
     */
    public function failed()
    {
        $user = $this->bracket->user;
        //mail admin
        Log::info('Score task '.$this->task->task_id.' failed for '.$user->name.'\'s bracket');
        $this->task->delete();
    }
}
