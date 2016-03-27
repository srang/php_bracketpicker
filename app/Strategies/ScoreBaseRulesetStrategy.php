<?php

namespace App\Strategies;

use App\Ruleset;
use App\Score;
use App\Bracket;
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
    protected $bracket;
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
        $this->bonusRules = $ruleset->bonusRules;
    }

    /**
     * Process and score a bracket based on the ruleset provided in constructor
     *
     * @param Bracket
     * @return Score
     */
    public function process(Bracket $bracket)
    {
        $score = 0;
        $games = BracketFactory::reverseBracket($bracket, new ReverseBaseBracketStrategy());
        $masterGames = BracketFactory::reverseBracket($this->master, new ReverseBaseBracketStrategy());
        Log::info('Scoring bracket '.$bracket->bracket_id);
        foreach ($masterGames as $round=>$master_games) {
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
        foreach ($this->bonusRules as $bonusRule) {
            $bonus = $bonusRule->instantiateRule($this->master, $bracket);
            $score += $bonus->score();
        }

        $s = Score::where('ruleset_id',$this->ruleset->ruleset_id)->where('bracket_id',$bracket->bracket_id)->first();
        if (!isset($s)) {
            $s = new Score([
                'ruleset_id' => $this->ruleset->ruleset_id,
                'bracket_id' => $bracket->bracket_id,
                'score' => 0
            ]);
        }
        $s->score = $score;
        $s->save();
        return $s;

    }
}
