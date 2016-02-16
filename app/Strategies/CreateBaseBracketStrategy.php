<?php

namespace App\Strategies;

use Log;
use App\Bracket;
use App\Strategies\AbstractCreateBracketStrategy;
use Illuminate\Http\Request;


/**
 * Concrete implementation of AbstractCreateBracketStrategy for
 * normal users and their brackets
 *
 */
class CreateBaseBracketStrategy extends AbstractCreateBracketStrategy
{
    /**
     * flag for master bracket
     */
    protected $master = 0;

    /**
     * Create a new bracket from request
     *
     * @param Request  $req
     * @return Bracket|null
     */
    public function read(Request $req)
    {
        $games = collect([]);
        // foreach round
        // foreach game
        // assert winner is one of team1,team2
        return attemptBracketize(null, null);

    }

}
