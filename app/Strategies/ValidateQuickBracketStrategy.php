<?php

namespace App\Strategies;

use Log;
use Auth;
use App\Strategies\IValidateBracketStrategy;

/**
 * Base implementation of IValidateBracketStrategy
 *
 */
class ValidateQuickBracketStrategy implements IValidateBracketStrategy
{

    /**
     * Validate bracket from request
     *
     * @param Request  $req
     * @return error collection
     */
    public function validate($req)
    {
        $errors = collect([]);
        foreach($req->games as $round=>$round_games) {
            foreach($round_games as $game_id=>$game) {
                if(empty($game['T1']) || $game['T1'] == 'TBD') {
                    $errors->push('Round '.$round.' Game '.$game_id.' Team 1 is invalid, cannot be TBD or empty');
                }
                if(empty($game['T2']) || $game['T2'] == 'TBD') {
                    $errors->push('Round '.$round.' Game '.$game_id.' Team 2 is invalid, cannot be TBD or empty');
                }
                if(empty($game['W']) || $game['W'] == 'TBD') {
                    $errors->push('Round '.$round.' Game '.$game_id.' Winner is invalid, cannot be TBD or empty');
                }
                Log::info('AAA');
                Log::info($game['T1']);
                Log::info($game['T2']);
                Log::info($game['W']);
            }
        }
        return $errors;
    }


}
