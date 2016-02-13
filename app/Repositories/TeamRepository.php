<?php

namespace App\Repositories;

use App\Region;
use App\Team;

class TeamRepository
{
    /**
     * Get all of the tasks for a given user.
     *
     * @param  User  $user
     * @return Collection
     */
    public function byRankRegion($rank, $region)
    {
        return Team::where('region_id', $region->region_id)
            ->where('rank',$rank)
            ->first();
    }
}
