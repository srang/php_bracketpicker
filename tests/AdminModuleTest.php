<?php

use App\Role;
use App\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AdminModuleTest extends TestCase
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
    }

    /**
     * test that the admin home page has access to team set up and bracket init
     *
     * @return void
     */
    public function testAdminHome()
    {
        $this->actingAs($this->admin)
            ->visit('/')
            ->click('Admin')
            ->seePageIs('/admin')
            ->see('Teams')
            ->see('Master Bracket');
    }

    /**
     * test that team can be created and that it is then listed in the teamlist
     *
     * @return void
     */
    public function testTeamsCreateListPage()
    {
        $name = 'Duke';
        $mascot = 'Blue Devils';
        $primary_color = '000';
        $secondary_color = 'FF00FF';
        $this->actingAs($this->admin)
            ->visit('/admin')
            ->click('Teams')
            ->seePageIs('/admin/teams')
            ->type($name, 'name')
            ->type($mascot, 'mascot')
            ->type($primary_color, 'primary_color')
            ->type($secondary_color, 'accent_color')
            ->press('Add Team')
            ->seePageIs('/admin/teams')
            ->see($name)
            ->see($mascot)
            ->see($primary_color)
            ->see($secondary_color)
            ->see('/path/to/icon')
            ->see('Delete Team')
            ->see('Edit Team');
    }

    /**
     * TODO test to ensure bad team submission doesn't work
     */

    /**
     * TODO test team edit works same as team create
     */
}
