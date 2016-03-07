<?php

namespace App\Strategies;

use Log;
use App\Bracket;
use App\Game;
use App\Strategies\IReverseBracketStrategy;


/**
 * Concrete implementation of IReverseBracketStrategy
 *
 */
class ReverseBaseBracketStrategy implements IReverseBracketStrategy
{

    protected $all_games;
    /**
     * Create a new bracket from request
     *
     * @param Request  $req
     * @return Bracket|null
     */
    public function build(Bracket $bracket)
    {
        $this->all_games = Game::all();
        $games = collect([]);

        $game = $this->all_games->where('game_id',$bracket->root_game)->first();
        $this->addGame($games, $game);
        return $games;
    }

    private function addGame($games, $game) {
        $round_games = $games->get($game->round_id);
        if (!isset($round_games)) {
            $games->put($game->round_id, collect([]));
        }
        $games->get($game->round_id)->push($game);
        if (isset($game->child_game_a)) {
            $a_game = $this->all_games->where('game_id',$game->child_game_a)->first();
            $this->addGame($games, $a_game);
        }
        if (isset($game->child_game_b)) {
            $b_game = $this->all_games->where('game_id',$game->child_game_b)->first();
            $this->addGame($games, $b_game);
        }

        Log::debug('Added game '.$game->game_id.' to games');
        return $games;
    }


}
