<?php

namespace App\Factories;

use Log;
use DB;
use App\Bracket;
use App\Strategies\ICreateBracketStrategy;
use App\Strategies\IReverseBracketStrategy;
use App\Strategies\IValidateBracketStrategy;
use App\Strategies\IScoreRulesetStrategy;
use Illuminate\Http\Request;


/**
 * Class to handle the assembly of brackets
 *
 */
class BracketFactory
{
    /**
     * Create a new bracket from request given creation strategy
     *
     * @param Request  $req
     * @param ICreateBracketStrategy  $strat
     * @return Bracket|null
     */
    public static function createBracket($req, ICreateBracketStrategy $strat)
    {
        return $strat->read($req);
    }

    /**
     * build a multidim game collection from a bracket instance
     * for easier displaying on a page
     *
     * @param Bracket bracket
     * @param IReverseBracketStrategy  $strat
     * @return game collection
     */
    public static function reverseBracket(Bracket $bracket, IReverseBracketStrategy $strat)
    {
        return $strat->build($bracket);
    }

    /**
     * validates bracket update/create request
     *
     * @param Request  $req
     * @param IValidateBracketStrategy  $strat
     * @return error collection
     */
    public static function validateBracket($req, IValidateBracketStrategy $strat)
    {
        return $strat->validate($req);
    }

    /**
     * Scores a set of brackets based on specified ruleset.
     * TODO should this belong here or should this (and
     * potentially other things) be split off into some
     * sort of bracket utility?
     *
     * @param $brackets  collection of Bracket
     * @param IScoreRulesetStrategy  $strat
     * @return score collection
     */
    public static function scoreBrackets($brackets, IScoreRulesetStrategy $strat)
    {
        return $strat->process($brackets);
    }

    /**
     * Helper function that figures out which
     * team should play which based on rank
     * FIXME this will need to be changed if
     * the system needs to support different
     * tournament sizes
     */
    public static function generateMatchups()
    {
        $first_teams = collect(range(1,8));
        $ret = collect([]);
        while (($c=$first_teams->count()) > 1) {
            if (($c + 1) % 2) {
                $hold = $first_teams->shift();
                $ret->prepend($first_teams->shift());
                $first_teams->prepend($hold);
            } else {
                $hold = $first_teams->pop();
                $ret->prepend($first_teams->pop());
                $first_teams->push($hold);
            }
        }
        $r = $first_teams->pop();
        $ret->prepend($r);
        return $ret;
    }


}
