<?php

namespace App\Repositories;

use App\Region;
use App\Team;

class TeamRepository
{
    /**
     * Get team by rank and region
     *
     * @param rank
     * @param region
     * @return Team
     */
    public function byRankRegion($rank, $region)
    {
        $region_actual = Region::where('region',$region)->first();
        return Team::where('region_id', $region_actual->region_id)
            ->where('rank',$rank)
            ->first();
    }

    /**
     * Get team by name
     *
     * @param  name
     * @return Team
     */
    public function byName($name)
    {
        return Team::where('name',$name)->first();
    }

    /**
     * Get team by name and validate its region and rank match
     *
     * @param  name
     * @param  region
     * @param  rank
     * @return Team
     */
    public function byNameRegionRank($name,$region,$rank)
    {
        $team_by_name = $this->byName($name);
        $team_by_rank_region = $this->byRankRegion($rank,$region);
        if (isset($team_by_name) && isset($team_by_rank_region) && $team_by_name->name === $team_by_rank_region->name) {
            return $team_by_name;
        } else {
            return NULL;
        }
    }

}
