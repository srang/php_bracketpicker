<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'game_id';

    /**
     * Teams participating in the game
     *
     * @return void
     */
    public function teams()
    {
      $team_a = $this->hasOne('App\Team','games_team_a_foreign','team_a');
      $team_b = $this->hasOne('App\Team','games_team_b_foreign','team_b');
      return [$team_a, $team_b];
    }
}
