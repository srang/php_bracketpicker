<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ruleset extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'ruleset_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','desc',
    ];

    public function baseRules()
    {
        return $this->hasMany('App\Rule','ruleset_id','ruleset_id');
    }

    public function bonusRules()
    {
        return $this->hasMany('App\BonusRule', 'ruleset_id','ruleset_id');
    }
}
