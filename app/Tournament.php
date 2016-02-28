<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'tournament_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'state_id', 'active'
    ];

    public function state()
    {
        return $this->belongsTo('App\State','state_id','state_id');
    }
}
