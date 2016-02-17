<?php

namespace App\Strategies;

use App\Bracket;


/**
 * Interface for description of how to build a bracket
 *
 */
interface IReverseBracketStrategy
{
    /**
     * Create a new bracket from request
     *
     * @param Bracke $bracket
     * @return Game collection
     */
    public function build(Bracket $bracket);

}
