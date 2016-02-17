<?php

use App\Team;
use App\Region;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TeamTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * team can be created
     *
     * @return void
     */
    public function testTeamCreate()
    {
        $name = 'Duke';
        $mascot = 'Blue Devils';
        $icon = '/path/icon/to';
        $primary_color = 'FF00FF';
        $accent_color = 'F0F0F0';
        $region = Region::all()->first();
        $rank = 2;
        $team = new Team([
            'name' => $name,
            'mascot' => $mascot,
            'icon_path' => $icon,
            'primary_color' => $primary_color,
            'accent_color' => $accent_color,
            'region_id' => $region->region_id,
            'rank' => $rank
        ]);
        $this->assertInstanceOf('App\Team',$team);
        $this->assertEquals($team->name, $name);
        $this->assertEquals($team->mascot, $mascot);
        $this->assertEquals($team->icon_path, $icon);
        $this->assertEquals($team->primary_color, $primary_color);
        $this->assertEquals($team->accent_color, $accent_color);
        $this->assertEquals($team->region_id, $region->region_id);
        $this->assertEquals($team->rank, $rank);
    }


    /**
     * Team can be persisted
     *
     * @return void
     */
    public function testUserSave()
    {
        $name = 'Duke';
        $mascot = 'Blue Devils';
        $icon = '/path/icon/to';
        $primary_color = 'FF00FF';
        $accent_color = 'F0F0F0';
        $region = Region::all()->first();
        $rank = 2;
        $team = new Team([
            'name' => $name,
            'mascot' => $mascot,
            'icon_path' => $icon,
            'primary_color' => $primary_color,
            'accent_color' => $accent_color,
            'region_id' => $region->region_id,
            'rank' => $rank
        ]);
        $team->save();
        $this->seeInDatabase('teams',[
            'name'=>$name,
            'mascot' =>$mascot
        ]);
        $this->assertEquals($team->region->region, $region->region);
    }
}
