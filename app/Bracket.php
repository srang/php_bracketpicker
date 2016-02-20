<?php

namespace App;

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

    public function winner()
    {
        return $this->root->winner;
    }

}
