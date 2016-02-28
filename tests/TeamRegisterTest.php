<?php

use App\Role;
use App\Region;
use App\Status;
use App\Team;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TeamRegisterTest extends TestCase
{

    use DatabaseTransactions;
    protected $admin;

    /**
     * Sets up base user and admin for tests
     */
    public function setUp()
    {
        parent::setUp();
        $this->admin = factory(App\User::class)->create();
        $this->admin ->roles()->attach(Role::where('role','user')->first()->role_id);
        $this->admin ->roles()->attach(Role::where('role','admin')->first()->role_id);
        $this->admin->status_id = Status::where('status','active')->first()->status_id;
        $this->admin->save();
    }

    /**
     * test that verifies that names have to be unique
     *
     * @return void
     */
    public function testTeamNameUnique()
    {
        $name = 'Sacremento';
        $mascot = 'Rangers';
        $primary_color = '000';
        $secondary_color = 'FF00FF';
        $region = Region::all()->first();
        $rank = 2;
        $this->actingAs($this->admin)
            ->visit('/admin/teams')
            ->type($name, 'name')
            ->type($mascot, 'mascot')
            ->type($primary_color, 'primary_color')
            ->type($secondary_color, 'accent_color')
            ->press('Add Team')
            ->seePageIs('/admin/teams')
            ->dontSee('Whoops! Something went wrong!')
            ->dontSee('The name has already been taken')
            ->see($name)
            ->see($mascot)
            ->type($name, 'name')
            ->type($mascot, 'mascot')
            ->type($primary_color, 'primary_color')
            ->type($secondary_color, 'accent_color')
            ->press('Add Team')
            ->seePageIs('/admin/teams')
            ->see('Whoops! Something went wrong!')
            ->see('The name has already been taken');
    }

    public function testTeamNameUniqueUpdate()
    {
        $name = 'Sacremento';
        $mascot = 'Rangers';
        $name_alt = 'Chernobyl';
        $mascot_alt = 'Chargers';
        $name_alt_alt = 'Rio';
        $mascot_alt_alt = 'Banana Hammocks';
        $primary_color = '000';
        $secondary_color = 'FF00FF';
        $region = Region::where('region','<>','')->first();
        $rank = 2;
        $this->actingAs($this->admin)
            ->visit('/admin/teams')
            ->type($name, 'name')
            ->type($mascot, 'mascot')
            ->type($primary_color, 'primary_color')
            ->type($secondary_color, 'accent_color')
            ->press('Add Team')
            ->seePageIs('/admin/teams')
            ->see($name)
            ->see($mascot)
            ->see('Save Successful')
            ->dontSee('Whoops! Something went wrong!')
            ->dontSee('The name has already been taken');

        $this->actingAs($this->admin)
            ->visit('/admin/teams')
            ->type($name_alt, 'name')
            ->type($mascot_alt, 'mascot')
            ->type($primary_color, 'primary_color')
            ->type($secondary_color, 'accent_color')
            ->press('Add Team')
            ->seePageIs('/admin/teams')
            ->see($name_alt)
            ->see($mascot_alt)
            ->see('Save Successful')
            ->dontSee('Whoops! Something went wrong!')
            ->dontSee('The name has already been taken');

        $team = Team::where('name',$name)->where('mascot',$mascot)->first();
        $this->assertInstanceOf('App\Team',$team);
        $this->actingAs($this->admin)
            ->visit('/admin/team/'.$team->team_id)
            ->seePageIs('/admin/team/'.$team->team_id)
            ->see($name)
            ->see($mascot)
            ->type($name_alt, 'name')
            ->type($mascot_alt, 'mascot')
            ->press('Update')
            ->seePageIs('/admin/team/'.$team->team_id)
            ->see('Team name already in use elsewhere')
            ->type($name_alt_alt, 'name')
            ->type($mascot_alt_alt, 'mascot')
            ->press('Update')
            ->seePageIs('/admin/teams')
            ->see('Save Successful')
            ->see($name_alt_alt)
            ->see($mascot_alt_alt);

    }

    /**
     * test that team can be created and that it is then
     * listed in the teamlist
     *
     * @return void
     */
    public function testTeamsCreateListPage()
    {
        $name = 'Sacremento';
        $mascot = 'Rangers';
        $primary_color = '000';
        $secondary_color = 'FF00FF';
        $region = Region::where('region','<>','')->first();
        $rank = 2;
        $this->actingAs($this->admin)
            ->visit('/admin')
            ->click('Teams')
            ->seePageIs('/admin/teams')
            ->type($name, 'name')
            ->type($mascot, 'mascot')
            ->type($primary_color, 'primary_color')
            ->type($secondary_color, 'accent_color')
            ->type($region->region, 'region')
            ->type($rank, 'rank')
            ->press('Add Team')
            ->seePageIs('/admin/teams')
            ->dontSee('Whoops! Something went wrong!')
            ->dontSee('The name has already been taken')
            ->see('Save Successful')
            ->see($name)
            ->see($mascot)
            ->see($rank)
            ->see($region->region)
            ->see('Swap Colors')
            ->see('Delete')
            ->see('Edit');
        $team = Team::where('name',$name)->where('mascot',$mascot)->first();
        $this->actingAs($this->admin)
            ->visit('/admin/team/'.$team->team_id)
            ->see($name)
            ->see($mascot)
            ->see($rank)
            ->see($region->region)
            ->see($primary_color)
            ->see($secondary_color);
    }


}
