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

    /**
     * Return which region team belongs to
     *
     * @var array
     */
    public function region()
    {
        return $this->belongsTo('App\Region','region_id','region_id');
    }

    /**
     * Set team's rank and region and unset for other team if same
     *
     * @var array
     */
    public function setRegionRank($region, $rank)
    {
        $region_actual = Region::where('region',$region)->first();
        $other_team = Team::where('rank',$rank)->where('region_id',$region_actual->region_id)->first();
        if(isset($other_team) && $other_team->name != $this->name) {
            $other_team->rank = NULL;
            $other_team->region_id = Region::where('region','')->first()->region_id;// null region
            $other_team->save();
        }
        $this->rank = $rank;
        $this->region_id = $region_actual->region_id;
        $this->save();
        return $this;
    }
}
