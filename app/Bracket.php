<?php

namespace App;

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

}
