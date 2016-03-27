<?php

namespace App\Strategies;

use Log;

use App\Rule;
use App\Game;
use App\Repositories\TeamRepository;
use App\Factories\BracketFactory;

class ScoreFinalFourBonusRuleStrategy extends AbstractScoreBonusRuleStrategy
{
    protected $masterGames;
    protected $bracketGames;

    /**
     * Create a new strategy
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(Bracket $master, Bracket $bracket)
    {
        parent::__construct($master,$bracket);
        $this->bracketGames = BracketFactory::reverseBracket($bracket, new ReverseBaseBracketStrategy());
        $this->masterGames = BracketFactory::reverseBracket($master, new ReverseBaseBracketStrategy());
    }

    /**
     * Bonus rule that checks if all the teams
     * in the final four are correct. Following
     * the convention laid down by ruleset scoring
     * it focuses on the winners of the previous
     * round rather than the teams in the actual
     * round. This makes looping easier (checking
     * one winner vs team_a and team_b)
     *
     * @return int score
     */
    public function score()
    {
        $r4m = $this->masterGames->get(4);
        $r4b = $this->bracketGames->get(4);
        $bonusEarned = true;
        foreach($r4m as $game) {
            $w = $r4b->shift()->victor;
            if($game->winner != $w->team_id) {
                $bonusEarned = false;
                break;
            }
        }
        if ($bonusEarned) {
            Log::info('Bracket '.$this->bracket->name.' earned the Final Four Bonus');
            return 30;
        }
        return 0;
    }
}
