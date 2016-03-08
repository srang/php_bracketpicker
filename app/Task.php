<?php

namespace App;

use App\User;
use App\Bracket;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'task_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'name', 'bracket_id',
    ];

    /**
     * Task owner
     *
     */
    public function user()
    {
        return $this->belongsTo('App\User','user_id','user_id');
    }

    /**
     * Existing Bracket
     *
     */
    public function bracket()
    {
        return $this->belongsTo('App\Bracket','bracket_id','bracket_id');
    }

}
