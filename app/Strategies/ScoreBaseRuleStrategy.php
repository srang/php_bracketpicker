<?php

namespace App\Strategies;

use Log;

use App\Rule;
use App\Game;
use App\Repositories\TeamRepository;

use App\Math\Math;

class ScoreBaseRuleStrategy
{

    protected $rule;
    protected $teamRepo;
    protected $math;

    /**
     * Create a new strategy
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(Rule $rule, TeamRepository $teams)
    {
        $this->rule = $rule;
        $this->math = new Math();
    }

    public function score(Game $game)
    {
        $this->math->clearVariables();
        $this->math->registerVariable('ROUND',$game->round_id);
        $this->math->registerVariable('RANK',$game->victor->rank);
        $ret = $this->math->evaluate($this->rule->rule);
        return $ret;
    }
}
