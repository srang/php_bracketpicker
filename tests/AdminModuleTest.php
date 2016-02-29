<?php

use App\Role;
use App\User;
use App\Status;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AdminModuleTest extends TestCase
{
    use DatabaseTransactions;
    protected $admin;
    protected $user;

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
            ->see('Mr Roboto');
    }

}
