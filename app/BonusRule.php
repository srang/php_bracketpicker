<?php

namespace App;

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
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'ruleset_id','rule',
    ];

    public function strategy()
    {
        $className = 'App\\Strategies\\'.$this->rule;
        if (is_subclass_of($className,'App\\Strategies\\AbstractScoreBonusRuleStrategy')) {
            $strat = new $className;
            return $strat;
        } else {
            return NULL;
        }
    }


}
