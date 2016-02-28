<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class VerificationToken extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'verification_id';

    protected $dates = ['expires','created_at','updated_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'token', 'user_id', 'expires'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'token',
    ];

    public function state()
    {
        return $this->belongsTo('App\State','state_id','state_id');
    }

    public function expired()
    {
        return $this->expires->lte(Carbon::now());
    }
}
