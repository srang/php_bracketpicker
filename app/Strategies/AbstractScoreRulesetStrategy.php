<?php

namespace App\Strategies;

use App\Ruleset;
use App\Bracket;
use App\Strategies\IScoreRulesetStrategy;
use App\Strategies\ReverseBaseBracketStrategy;
use App\Factories\BracketFactory;
use App\Repositories\TeamRepository;

use Log;
use DB;
use Illuminate\Http\Request;

/**
 * Abstract implementation of IScoreRulesetStrategy
 *
 */
abstract class AbstractScoreRulesetStrategy implements IScoreRulesetStrategy
{

    /* Master Bracket */
    protected $master;
    protected $teamRepo;
    /* collection of brackets to score */
    protected $ruleset;

    /**
     * Create a new strategy
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(TeamRepository $teams, Ruleset $ruleset)
    {
        $this->teamRepo = $teams;
        $this->ruleset = $ruleset;
        $this->master = Bracket::where('master',1)->first();
    }

    /**
     * Create a new bracket from request
     *
     * @param  Bracket
     * @return Score
     */
    abstract public function process(Bracket $bracket);

}
