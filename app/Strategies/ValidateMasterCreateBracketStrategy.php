<?php

namespace App\Strategies;

use Log;
use Auth;
use App\Region;
use App\Strategies\IValidateBracketStrategy;
use App\Repositories\TeamRepository;

/**
 * Base implementation of IValidateBracketStrategy
 *
 */
class ValidateMasterCreateBracketStrategy implements IValidateBracketStrategy
{

    protected $teamRepo;

    /**
     * Create a new validator instance
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(TeamRepository $teams)
    {
        $this->teamRepo = $teams;
    }


    /**
     * Validate bracket from request
     *
     * @param Request  $req
     * @return error collection
     */
    public function validate($req)
    {
        $errors = collect([]);
        foreach ($req->get('team') as $region => $t) {
            $teams = collect($t);
            $region_size = $teams->count();
            $region_actual = Region::where('region',$region)->first();
            for ($team_rank = 1; $team_rank <= $region_size; $team_rank++) { 
                $team = $this->teamRepo->byNameRegionRank($teams->get($team_rank),$region,$team_rank);
                if(empty($team)) {
                    $errors->push("Team ".$teams->get($team_rank)." not valid");
                }
            }
        }
        return $errors;
    }


}
