<?php

namespace App\Strategies;

use Log;
use DB;
use App\Game;
use App\Team;
use App\Bracket;
use App\Strategies\ICreateBracketStrategy;
use App\Repositories\TeamRepository;
use Illuminate\Http\Request;

/**
 * Abstract implementation of ICreateBracketStrategy
 *
 */
abstract class AbstractCreateBracketStrategy implements ICreateBracketStrategy
{

    /**
     * flag for master bracket
     */
    protected $master;
    protected $teamRepo;

    /**
     * Create a new strategy
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(TeamRepository $teams)
    {
        $this->teamRepo = $teams;
    }

    /**
     * Create a new bracket from request
     *
     * @param Request  $req
     * @return Bracket|null
     */
    abstract public function read($req);

    /**
     * connect parent to children and store for later
     *
     * @param round Integer round of the tournament
     * @param game_matrix Game[][] storing games by round
     * @param Team team1
     * @param Team team2
     * @param Team winner
     * @param isMaster bool
     * @return void
     */
    protected function connectChildren($round_id, $game_matrix, Team $team_a, Team $team_b, Team $winner)
    {
        Log::debug('Creating game for '.$team_a->name.' vs '.$team_b->name.' in round: '.$round_id.' in region '.$team_a->region->region);
        $game = new Game([
            'team_a' => $team_a->team_id,
            'team_b' => $team_b->team_id,
            'master' => $this->master,
            'winner' => $winner->team_id,
            'round_id' => $round_id
        ]);

        // first round games don't have children
        if ($round_id > 1) {
            $child1 = $game_matrix->get($round_id-1)->shift();
            $child1->save();
            $child2 = $game_matrix->get($round_id-1)->shift();
            $child2->save();
            $game->child_game_a = $child1->game_id;
            $game->child_game_b = $child2->game_id;
        }
        $game_matrix->get($round_id)->push($game);
        return $game_matrix;
    }

    /**
     * try to finalize bracket creation, if unsuccessful return null, otherwise return bracket
     *
     * @param round Integer round of the tournament
     * @param game_matrix Game[][] storing games by round
     * @return Bracket|null
     */
    protected function attemptBracketize($round_id, $game_matrix)
    {
        Log::debug('Attempting bracketize '.$round_id);
        if ($game_matrix->get($round_id)->count() == 1) {
            $game = $game_matrix->get($round_id)->shift();
            $game->save();
            $bracket = new Bracket([
                'root_game' => $game->game_id,
                'master' => $this->master
            ]);
            return $bracket;

        } else if ($game_matrix->get($round_id)->count() < 1) {
            Log::error('game matrix count below 1');
        }
        return null;
    }

    protected function readHelper($req)
    {
        Log::info("Creating bracket");
        $games = collect([]);
        $req_games = $req->get('games');
        $round_count = count($req_games);
        for($round_id = 1; $round_id <= $round_count; $round_id++) {
            $round = $req_games[$round_id];
            Log::debug("creating round ".$round_id);
            $games->put($round_id, collect([]));
            foreach($round as $game) {
                $team_a = $this->teamRepo->byName($game['T1']);
                $team_b = $this->teamRepo->byName($game['T2']);
                $winner = $this->teamRepo->byName($game['W']);
                Log::debug('Found Teams {'.$team_a->name.','.$team_b->name.','.$winner->name.'}');
                $this->connectChildren($round_id, $games, $team_a, $team_b, $winner);
            }
            $bracket = $this->attemptBracketize($round_id, $games);
        }
        return $bracket;
    }


    protected function save($bracket,$name,$user_id)
    {
        if (isset($bracket)) {
            $bracket->name = $name;
            if(isset($user_id)) {
                $bracket->user_id = $user_id;
            }
            $bracket->save();
            DB::commit();
            return true;
        } else {
            DB::rollBack();
            Log::error('Something went wrong with user bracket creation');
            return false;
        }
    }

}
