<?php

namespace App\Strategies;

use Log;

use App\Bracket;

abstract class AbstractScoreBonusRuleStrategy implements IScoreBonusRuleStrategy
{

    protected $master;
    protected $bracket;

    /**
     * Create a new strategy
     *
     * @param Bracket $master - the master bracket
     * @param Bracket $bracket - the bracket to score
     * @return void
     */
    public function __construct(Bracket $master, Bracket $bracket)
    {
        $this->bracket = $bracket;
        $this->master = $master;
    }

    abstract public function score();
}
