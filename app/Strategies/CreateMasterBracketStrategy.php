<?php

namespace App\Strategies;

use Log;
use App\Bracket;
use App\Team;
use App\Region;
use App\Strategies\AbstractCreateBracketStrategy;
use Illuminate\Http\Request;


/**
 * Concrete implementation of AbstractCreateBracketStrategy for
 * creating the master bracket
 *
 */
class CreateMasterBracketStrategy extends AbstractCreateBracketStrategy
{
    /**
     * flag for master bracket
     */
    protected $master = 1;

    protected $teamRepo;


    /**
     * Create a new bracket from request
     *
     * @param Request  $req
     * @return Bracket|null
     */
    public function read(Request $req)
    {
        // TODO define constant for region size
        $games = collect([]);
        // TODO determin game count from request
        // don't count region arrays as an additional game
        $team_count = (sizeof($req->team,1)-count($req->team));
        $round_count = intval(log($team_count,2));
        $game_count = $team_count/2;

        for ($round = 1; $round <= $round_count; $round++) {
            Log::info('round '.$round.' count'.$round_count);
            $games->put($round,collect([]));
            // for master bracket creation only care about round 1
            // the rest is TBD
            if ($round == 1) {
                foreach ($req->team as $region => $teams) {
                    $region_size = sizeof($teams);
                    $region_actual = Region::where('region',$region)->first();
                    for ($team_rank = 1; $team_rank <= $region_size/2; $team_rank++) {
                        $tbd = Team::where('name','TBD')->where('region_id',$region_actual->region_id)->first();
                        $teams_col = collect($teams);
                        $favored = $this->teamRepo->byNameRegionRank($teams_col->get($team_rank),$region,$team_rank);
                        $underdog = $this->teamRepo->byNameRegionRank($teams_col->get(($region_size+1-$team_rank)),$region,($region_size+1-$team_rank));
                        if(isset($favored) && isset($underdog)) {
                            $games = $this->connectChildren($round, $games, $favored, $underdog, $tbd);
                        } else {
                            Log::error('One of the teams wasn\'t found during master bracket creation');
                            // throw custom exception
                        }
                    }
                }
            } else {
                for($i = 0; $i < $game_count; $i++) {
                    if($round > 4) {
                        $g = $games->get($round-1);
                        Log::info("previous round".$g);
                    }
                    $r = $games->get($round-1)->first()->teams()->first()->region_id;
                    $tbd = Team::where('name','TBD')->where('region_id',$r)->first();
                    $games = $this->connectChildren($round, $games, $tbd, $tbd, $tbd);
                    if($round > 4) {
                        $g = $games->get($round);
                        Log::info("round after game".$g);
                    }
                }
            }
            $bracket = $this->attemptBracketize($round, $games);
            if (isset($bracket)) {
                return $bracket;
            }
            $game_count = $game_count/2;
            Log::info('_count'.$game_count);
        }
        Log::error('Something went wrong with master bracket creation');
        return null;
    }

}
