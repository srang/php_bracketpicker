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
        Log::info($req->games);
        $req_games = $req->games;
        $round_count = count($req_games);
        for($round_id = 1; $round_id <= $round_count; $round_id++) {
            $round = $req_games[$round_id];
            Log::info("creating round ".$round_id);
            $games->put($round_id, collect([]));
            foreach($round as $game) {
                $team_a = $this->teamRepo->byName($game['T1']);
                $team_b = $this->teamRepo->byName($game['T2']);
                if ($team_a->name === $game['W']) {
                    $winner = $this->teamRepo->byName($game['T1']);
                } else if ($team_b->name === $game['W']) {
                    $winner = $this->teamRepo->byName($game['T2']);
                } else {
                    Log::error('Winner doesn\'t match either of the teams in the game.');
                    return null;
                }
                Log::info('Found Teams {'.$team_a->name.','.$team_b->name.','.$winner->name.'}');
                $this->connectChildren($round_id, $games, $team_a, $team_b, $winner);
            }
            $bracket = $this->attemptBracketize($round_id, $games);
        }
        if (isset($bracket)) {
            return $bracket;
        }
        Log::error('Something went wrong with master bracket creation');
        return null;
    }

}
