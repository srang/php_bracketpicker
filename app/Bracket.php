<?php

namespace App;

use App\Ruleset;
use App\Score;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Bracket extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'bracket_id';


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'root_game', 'name', 'master',
    ];

    public function user()
    {
        return $this->belongsTo('App\User','user_id','user_id');
    }

    public function root()
    {
        return $this->belongsTo('App\Game','root_game','game_id');
    }

    public function score($ruleset_id)
    {
        $s = Score::where('ruleset_id',$ruleset_id)->where('bracket_id',$this->bracket_id)->first();
        if (isset($s)) {
            return $s->score;
        } else {
            return '-';
        }
    }
}
