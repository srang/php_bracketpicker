<?php

namespace App\Strategies;

use App\Bracket;
use Illuminate\Http\Request;


/**
 * Interface for how to score a ruleset
 *
 */
interface IScoreRulesetStrategy
{

    /**
     * Create Scores for each bracket processed
     *
     * @param $brackets
     * @return Score
     */
    public function process($brackets);
}
