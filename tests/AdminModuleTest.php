<?php

use App\Role;
use App\User;
use App\Status;
use App\Tournament;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AdminModuleTest extends TestCase
{
    use DatabaseTransactions;
    protected $admin;
    protected $user;
    protected $tourney;

    /**
     * test that it won't work without master
     *
     */


    /**
     * Sets up base user and admin for tests
     */
    public function setUp()
    {
        parent::setUp();
        $users = factory(App\User::class,2)->create();
        $users->each(function($u)
        {
            $u->roles()->attach(Role::where('role','user')->first()->role_id);
            $u->status_id = Status::where('status','active')->first()->status_id;
            $u->save();
        });
        $this->user = $users->pop();
        $this->admin = $users->pop();
        $this->admin->roles()->attach(Role::where('role','admin')->first()->role_id);
        $this->tourney = Tournament::where('active',1)->first();
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
            ->see('Bracket')
            ->see('Users')
            ->click('Teams')
            ->seePageIs('/admin/teams')
            ->click('Back')
            ->seePageIs('/admin');
        $this->actingAs($this->admin)
            ->visit('/')
            ->click('Admin')
            ->seePageIs('/admin')
            ->see('Teams')
            ->see('Bracket')
            ->see('Users')
            ->click('Users')
            ->seePageIs('/admin/users')
            ->click('Back')
            ->seePageIs('/admin');
        $this->actingAs($this->admin)
            ->visit('/admin/brackets')
            ->click('Back')
            ->seePageIs('/admin');
    }

    public function testUsersList()
    {
        $this->actingAs($this->admin)
            ->visit('/admin/users')
            ->see($this->admin->email)
            ->see($this->user->email)
            ->see('Mr Roboto')
            ->click('Back')
            ->seePageIs('/admin');
    }

    /**
     * test that the admin home page has access to team set up and bracket init
     *
     * @return void
     */
    public function testAdminBrackets()
    {
        $this->actingAs($this->admin)
            ->visit('/admin/brackets')
            ->see('Master Bracket')
            ->click('Back')
            ->seePageIs('/admin');
        if($this->tourney->state == 'setup') {
            $this->actingAs($this->admin)
                ->visit('/admin/brackets')
                ->see('Master Bracket Setup Required')
                ->click('Create')
                ->seePageIs('/admin/brackets/master')
                ->see('Start')
                ->see('Save')
                ->click('Back')
                ->seePageIs('/admin/brackets');

        } else if ($this->tourney->state == 'submission') {
            $this->actingAs($this->admin)
                ->visit('/admin/brackets')
                ->see('Bracket Submission Open')
                ->click('Edit')
                ->seePageIs('/admin/brackets/master')
                ->click('Back')
                ->seePageIs('/admin/brackets');
            $this->actingAs($this->admin)
                ->visit('/admin/brackets')
                ->click('Create Bracket')
                ->seePageIs('/admin/brackets/new')
                ->click('Back')
                ->seePageIs('/admin/brackets');
        }
    }

}
