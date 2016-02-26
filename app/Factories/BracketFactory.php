<?php

namespace App\Factories;

use Log;
use DB;
use App\Bracket;
use App\Strategies\ICreateBracketStrategy;
use App\Strategies\IReverseBracketStrategy;
use App\Strategies\IValidateBracketStrategy;
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
    public static function createBracket(Request $req, ICreateBracketStrategy $strat)
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
    public static function validateBracket(Request $req, IValidateBracketStrategy $strat)
    {
        return $strat->validate($req);
    }

}
