<?php

namespace App\Strategies;

use Log;
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
    abstract public function read(Request $req);

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
    protected function connectChildren($round, $game_matrix, Team $team_a, Team $team_b, Team $winner)
    {
        Log::debug('Creating game for '.$team_a->name.' vs '.$team_b->name.' in round: '.$round.' in region '.$team_a->region->region);
        $game = new Game([
            'team_a' => $team_a->team_id,
            'team_b' => $team_b->team_id,
            'master' => $this->master,
            'winner' => $winner->team_id,
            'round_id' => $round
        ]);

        // first round games don't have children
        if ($round > 1) {
            $child1 = $game_matrix->get($round-1)->shift();
            $child1->save();
            $child2 = $game_matrix->get($round-1)->shift();
            $child2->save();
            $game->child_game_a = $child1->game_id;
            $game->child_game_b = $child2->game_id;
        }
        $game_matrix->get($round)->push($game);
        return $game_matrix;
    }

    /**
     * try to finalize bracket creation, if unsuccessful return null, otherwise return bracket
     *
     * @param round Integer round of the tournament
     * @param game_matrix Game[][] storing games by round
     * @return Bracket|null
     */
    protected function attemptBracketize($round, $game_matrix)
    {
        if ($game_matrix->get($round)->count() == 1) {
            $game = $game_matrix->get($round)->shift();
            $game->save();
            $bracket = new Bracket([
                'root_game' => $game->game_id,
                'master' => $this->master
            ]);
            return $bracket;

        } else if ($game_matrix->get($round)->count() < 1) {
            Log::error('game matrix count below 1');
        }
        return null;
    }

}
