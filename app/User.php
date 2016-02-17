<?php

namespace App;

use Log;
use App\Status;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'status_id',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The status of the user
     *
     * @return status
     */
    public function status()
    {
        return $this->belongsTo('App\Status','status_id','status_id');
    }

    /**
     * The brackets belonging to the user
     *
     * @return brackets
     */
    public function brackets()
    {
        return $this->hasMany('App\Bracket','user_id','user_id');
    }

    /**
     * The roles assigned to the user
     *
     * @return roles
     */
    public function roles()
    {
        $roles = $this->belongsToMany('App\Role','userroles');
        return $roles;
    }

    /**
     * Checks if user has specified role
     *
     * @return boolean
     */
    public function hasRole($role)
    {
        $roles = $this->roles;
        $ret = $roles->where('role',$role)->count();
        Log::debug("Does user: ".$this->email." have role: ".$role." : ".(($ret)?"true":"false"));
        return $ret != 0;
    }

}
