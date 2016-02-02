<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{

    public function users()
    {
      return $this->belongsToMany('App\User', 'userroles','role_id','user_id');
    }
    //
}
