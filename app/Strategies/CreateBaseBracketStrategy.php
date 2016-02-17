<?php

namespace App\Strategies;

use Log;
use App\Bracket;
use App\Strategies\AbstractCreateBracketStrategy;
use Illuminate\Http\Request;


/**
 * Concrete implementation of AbstractCreateBracketStrategy for
 * normal users and their brackets
 *
 */
class CreateBaseBracketStrategy extends AbstractCreateBracketStrategy
{
    /**
     * flag for master bracket
     */
    protected $master = 0;

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
        foreach($req->round as $round_id => $round) {
            foreach($round->game as $game) {
                $team_a = $teamRepo->byName($game->team_a);
                $team_b = $teamRepo->byName($game->team_b);
                $winner;
                if ($team_a->name === $game->winner) {
                    $winner = $teamRepo->byName($game->team_a);
                } else if ($team_b->name === $game->winner) {
                    $winner = $teamRepo->byName($game->team_b);
                } else {
                    Log::error('Winner doesn\'t match either of the teams in the game.');
                    return null;
                }
                $this->connectChildren($round, $games, Team $team_a, Team $team_b, Team $winner)
            }
        }
        $bracket = $this->attemptBracketize($round, $games);
        if (isset($bracket)) {
            return $bracket;
        }
        Log::error('Something went wrong with master bracket creation');
        return null;
    }

}
