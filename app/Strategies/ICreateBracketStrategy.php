<?php

namespace App\Strategies;

use App\Bracket;
use Illuminate\Http\Request;


/**
 * Interface for description of how to build a bracket
 *
 */
interface ICreateBracketStrategy
{
    /**
     * Create a new bracket from request
     *
     * @param Request  $req
     * @return Bracket|null
     */
    public function read(Request $req);

}
