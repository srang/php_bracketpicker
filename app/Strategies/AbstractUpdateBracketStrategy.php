<?php

namespace App\Strategies;

use App\Game;
use App\Team;
use App\Bracket;
use App\Strategies\AbstractCreateBracketStrategy;
use App\Repositories\TeamRepository;

use Cache;
use Log;
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
            // clear old cache entry
            Cache::forget('bracket_'.$this->existingBracket->bracket_id);
            Log::info('Deleting old bracket '.$this->existingBracket->bracket_id);
            $this->existingBracket->delete();
            return true;
        } else {
             return false;
        }
    }
}
