<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'userrole_id';

    /**
     * Override the default table name
     *
     * @var array
     */
    protected $table = 'userroles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'role_id',
    ];

    /**
     * All of the relationships to be touched.
     *
     * @var array
     */
    protected $touches = ['users'];

    /**
     * Get the user the userrole belongs to
     */
    public function user()
    {
        return $this->hasOne('App\User', 'user_id');
    }

    /**
     * Get the role the userrole belongs to
     */
    public function role()
    {
        return $this->hasOne('App\Role', 'role_id');
    }
}
