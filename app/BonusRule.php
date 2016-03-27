<?php

namespace App;

use Log;
use Illuminate\Database\Eloquent\Model;

class BonusRule extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'rule_id';

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'bonusrules';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ruleset_id','rule',
    ];

    /**
     * Use reflection to instantiate a bonus rule
     * scoring strategy to assess the points earned
     * by a bracket.
     */
    public function instantiateRule(Bracket $master, Bracket $bracket)
    {
        $className = 'App\\Strategies\\'.$this->rule;
        if (is_subclass_of($className,'App\\Strategies\\AbstractScoreBonusRuleStrategy')) {
            Log::debug('Instantiating bonus rule '.$className);
            $strat = new $className($master, $bracket);
            return $strat;
        } else {
            return NULL;
        }
    }


}
