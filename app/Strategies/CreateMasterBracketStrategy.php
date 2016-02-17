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
        $games = collect([]);
        // don't count region arrays as an additional game
        $team_count = (sizeof($req->team,1)-count($req->team));
        $round_count = intval(log($team_count,2));
        $game_count = $team_count/2;

        for ($round = 1; $round <= $round_count; $round++) {
            $games->put($round,collect([]));
            // for master bracket creation only care about round 1
            // the rest is TBD
            if ($round == 1) {
                foreach ($req->team as $region => $teams) {
                    $region_size = sizeof($teams);
                    $region_actual = Region::where('region',$region)->first();
                    $tbd = Team::where('name','TBD')->where('region_id',$region_actual->region_id)->first();
                    for ($team_rank = 1; $team_rank <= $region_size/2; $team_rank++) {
                        $teams_in_game = $this->getTeams($teams, $region, $team_rank, $region_size);
                        if (isset($teams)){
                            $games = $this->connectChildren($round, $games, $teams_in_game['favored'], $teams_in_game['underdog'], $tbd);
                        } else {
                            return null;
                        }
                    }
                }
            } else {
                for($i = 0; $i < $game_count; $i++) {
                    $r = $games->get($round-1)->first()->teams()->first()->region_id;
                    $tbd = Team::where('name','TBD')->where('region_id',$r)->first();
                    $games = $this->connectChildren($round, $games, $tbd, $tbd, $tbd);
                }
            }
            $bracket = $this->attemptBracketize($round, $games);
            if (isset($bracket)) {
                return $bracket;
            }
            $game_count = $game_count/2;
        }
        Log::error('Something went wrong with master bracket creation');
        return null;
    }


    private function getTeams($teams, $region, $team_rank, $region_size) {
        $teams_col = collect($teams);
        $favored = $this->teamRepo->byNameRegionRank($teams_col->get($team_rank),$region,$team_rank);
        $underdog = $this->teamRepo->byNameRegionRank($teams_col->get(($region_size+1-$team_rank)),$region,($region_size+1-$team_rank));
        if(isset($favored) && isset($underdog)) {
            return [
                'favored' => $favored,
                'underdog' => $underdog
            ];
        } else {
            Log::error('One of the teams wasn\'t found during master bracket creation');
            return null;
        }
    }
}
