<?php

namespace App\Strategies;

use Log;

use App\Rule;
use App\Game;
use App\Repositories\TeamRepository;

//use App\Math;

class ScoreBaseRuleStrategy
{

    protected $rule;
    protected $teamRepo;

    /**
     * Create a new strategy
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(Rule $rule, TeamRepository $teams)
    {
        $this->rule = $rule;
        $this->teamRep = $teams;
    }

    public function score(Game $game) {
        /* TODO use Math to parse the rule->rule */
        return $game->victor->rank;
    }
}
