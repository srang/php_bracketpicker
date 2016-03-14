<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'region_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'region',
    ];


    public function teams()
    {
        return $this->hasMany('App\Team','region_id','region_id');
    }


    public static function orderedRegions()
    {
        $ret = collect([]);
        $regions = Region::where('region','<>','')->get();
        $ret->push($regions->where('region','West')->first());
        $ret->push($regions->where('region','South')->first());
        $ret->push($regions->where('region','East')->first());
        $ret->push($regions->where('region','Midwest')->first());
        return $ret;
    }
}
