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
                    $errors->push('R'.$round.'G'.$game_id.'T1');
                }
                if(empty($game['T2']) || $game['T2'] == 'TBD') {
                    $errors->push('R'.$round.'G'.$game_id.'T2');
                }
                if(empty($game['W']) || $game['W'] == 'TBD') {
                    $errors->push('R'.$round.'G'.$game_id.'W');
                }
            }
        }
        return $errors;
    }


}
