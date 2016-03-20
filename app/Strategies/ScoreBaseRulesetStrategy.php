<?php

namespace App\Strategies;

use App\Ruleset;
use App\Strategies\AbstractScoreRulesetStrategy;
use App\Strategies\ReverseBaseBracketStrategy;
use App\Factories\BracketFactory;
use App\Repositories\TeamRepository;

use Log;
use DB;
use Illuminate\Http\Request;

/**
 * concrete implementation of IScoreRulesetStrategy
 *
 */
class ScoreBaseRulesetStrategy extends AbstractScoreRulesetStrategy
{

    /* Master Bracket */
    protected $master;
    protected $teamRepo;
    /* collection of brackets to score */
    protected $brackets;
    protected $ruleset;
    protected $rules;
    protected $bonusRules;

    /**
     * Create a new strategy
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(TeamRepository $teams, Ruleset $ruleset)
    {
        parent::__construct($teams, $ruleset);
        $this->rules = $ruleset->baseRules;
        //$this->bonusRules = $ruleset->bonusRules;
    }

    public function process($brackets)
    {
        $scores = collect([]);

        /* go through each bracket and score it */
        foreach($brackets as $bracket) {
            $score = 0;// new Score();
            $games = BracketFactory::reverseBracket($bracket, new ReverseBaseBracketStrategy());
            Log::info('Scoring bracket '.$bracket->bracket_id);
            foreach ($this->masterGames as $round=>$master_games) {
                $round_games = $games[$round];
                Log::info('Scoring round '.$round);
                $rule = new ScoreBaseRuleStrategy($this->rules->where('round_id',$round)->first(),$this->teamRepo);
                foreach($round_games as $game) {
                    $master_game = $master_games->shift();
                    if($game->victor->team_id == $master_game->winner) {
                        $add = $rule->score($game);
                        Log::info("Score! Adding ".$add.' to '.$score);
                        $score += $add;
                    }
                }
            }
            // bonus rules
            // $score->save();
            $scores->put($bracket->bracket_id, $score);
        }
        return $scores;

    }
}
