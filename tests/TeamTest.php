<?php

use App\Team;
use App\Region;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TeamTest extends TestCase
{
    use DatabaseTransactions;

    protected $test_team;

    /**
     * create test team
     */
    public function setUp()
    {
        parent::setUp();
        $this->test_team = factory(App\Team::class)->create();
    }


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
    public function testTeamSave()
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


    /**
     * Test team region function
     *
     * @return void
     */
    public function testTeamRegion()
    {
        $region = Region::where('region_id',$this->test_team->region_id)->first();
        $this->assertEquals($this->test_team->region->region_id, $region->region_id);
    }

    /**
     * Test team setRegionRank function
     *
     * @return void
     */
    public function testTeamSetRegionRank()
    {
        $rank = 12;
        $region = Region::where('region','<>','')->first();
        $this->test_team->setRegionRank($region->region,$rank);
        $this->assertEquals($this->test_team->region_id, $region->region_id);
        $this->assertEquals($this->test_team->rank, $rank);
    }
}
