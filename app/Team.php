<?php

namespace App;

use App\Region;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'team_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'name','mascot','icon_path','primary_color','accent_color','region_id','rank',
    ];

    public function region()
    {
        return $this->belongsTo('App\Region','region_id','region_id');
    }

}
