<?php

use App\Tournament;
use App\State;
use App\Status;
use App\Region;
use App\Bracket;
use App\Role;
use App\User;
use App\Team;
use App\Game;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MasterBracketTest extends TestCase
{

    use DatabaseTransactions;

    protected $admin;
    protected $tournament;

    /**
     * Sets up base user and admin for tests
     */
    public function setUp()
    {
        parent::setUp();
        $this->tournament = Tournament::where('active',1)->first();
        $this->admin = factory(App\User::class)->create();
        $this->admin->roles()->attach(Role::where('role','user')->first()->role_id);
        $this->admin->roles()->attach(Role::where('role','admin')->first()->role_id);
        $this->admin->status_id = Status::where('status','active')->first()->status_id;
        $this->admin->save();
        Bracket::where('master',1)->delete();
        DB::table('games')->delete();
        DB::table('tournaments')->update(['state_id'=>1]);
        Team::where('name','<>','TBD')->delete();
    }

/*
 * Test that save works with only some fields filled
 * Test that save with duplicates will only save one (should make consistent which one
 * Test that save with bad team name will not work
 * Test that save failure preserves entries and unsaved status + error
 * Test that submit requires all fields to be filled with valid teams
 * Test that submit requires all teams to be in ONE game
 */

    /**
     *  test bracket home page when master not created yet
     *
     * @return void
     */
    public function testMasterNotCreated()
    {
        //$this->actingAs($this->admin)
        //    ->visit('/admin/brackets')
        //    ->see('Master Bracket Setup Required')
        //    ->see('Not Created Yet')
        //    ->see('Create')
        //    ->dontSee('Bracket Submission Open')
        //    ->dontSee('Created At')
        //    ->dontSee('Edit')
        //    ->dontSee('Start Tournament')
        //    ->dontSee('Create Bracket');
    }

    /**
     *  Test creation of master bracket
     *
     * @return void
     */
    public function testMasterCreate()
    {
        //$this->actingAs($this->admin)
        //    ->visit('/admin/brackets')
        //    ->see('Master Bracket Setup Required')
        //    ->see('Not Created Yet')
        //    ->see('Create')
        //    ->click('Create')
        //    ->seePageIs('/admin/brackets/master')
        //    ->see('Start')
        //    ->see('Save')
        //    ->see('Back')
        //    ->click('Back')
        //    ->seePageIs('/admin/brackets');

        //$regions = Region::where('region','<>','')->get();
        //foreach ($regions as $region) {
        //    $this->actingAs($this->admin)
        //        ->visit('/admin/brackets/master')
        //        ->see($region->region);
        //}
        //$teams = factory(App\Team::class, 64)->create([
        //    'rank'=>1,
        //    'region_id'=>Region::where('region','')->first()->region_id
        //]);
        //$region_ids = $regions->modelKeys();
        //for($i=0; $i < 64; $i++) {
        //    $team = $teams->shift();
        //    Log::error('region '.$regions->where('region_id',$region_ids[floor($i/16)])->first()->region.' rank '.($i%16+1));
        //    $team->setRegionRank($regions->where('region_id',$region_ids[floor($i/16)])->first()->region,($i%16+1));
        //    $teams->push($team);
        //}
        //foreach ($teams as $team) {
        //    $this->actingAs($this->admin)
        //        ->visit('/admin/brackets/master')
        //        ->see($team->name);
        //}
        //$this->actingAs($this->admin)
        //    ->visit('/admin/brackets/master')
        //    ->press('Save')
        //    ->see('Save Successful')
        //    ->type('true','start_madness')
        //    ->press('Save')
        //    ->see('Save Successful. Bracket submission is open')
        //    ->seeInDatabase('brackets',['name'=>'Master Bracket','master' => 1])
        //    ->click('Back')
        //    ->seePageIs('/admin/brackets');
        //$this->actingAs($this->admin)
        //    ->visit('/admin/brackets')
        //    ->see('Bracket Submission Open')
        //    ->see('Start Tournament')
        //    ->see('Create Bracket');
        //$state = $this->tournament->state->name;
        //$this->assertEquals($state,'submission');
    }

}
