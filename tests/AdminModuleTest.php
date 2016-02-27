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
     * test that it won't work without master
     *
     */


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

}
