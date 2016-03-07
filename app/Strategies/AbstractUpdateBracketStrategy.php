<?php

namespace App\Strategies;

use Log;
use App\Game;
use App\Team;
use App\Bracket;
use App\Strategies\AbstractCreateBracketStrategy;
use App\Repositories\TeamRepository;
use Illuminate\Http\Request;

/**
 * Abstract implementation of ICreateBracketStrategy
 *
 */
abstract class AbstractUpdateBracketStrategy extends AbstractCreateBracketStrategy
{

    /**
     * flag for master bracket
     */
    protected $master;
    protected $teamRepo;
    protected $existingBracket;

    /**
     * Create a new strategy
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(TeamRepository $teams, Bracket $bracket)
    {
        $this->teamRepo = $teams;
        $this->existingBracket = $bracket;
    }

    protected function save($bracket,$name,$user_id)
    {
        if(parent::save($bracket,$name,$user_id)) {
            $this->existingBracket->delete();
            Log::info('Deleting old bracket');
            return true;
        } else {
             return false;
        }
    }
}
