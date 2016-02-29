<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'state_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'name', 'next_id', 'prev_id'
    ];

    public function next()
    {
        return $this->belongsTo('App\State','next_id','state_id');
    }

    public function prev()
    {
        return $this->belongsTo('App\State','prev_id','state_id');
    }

}
