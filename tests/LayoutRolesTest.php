<?php

use App\Role;
use App\User;
use App\Status;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LayoutRolesTest extends TestCase
{
    use DatabaseTransactions;


    protected $user;
    protected $admin;

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
     * test guest home page only has register and login
     *
     * @return void
     */
    public function testGuestRoot()
    {
        $this->visit('/')
            ->seePageIs('/login')
            ->see('Register')
            ->see('Login')
            ->dontSee('Brackets')
            ->dontSee('Amdin')
            ->dontSee('Home');
    }

    /**
     * test guest can't get to home
     *
     * @return void
     */
    public function testGuestHome()
    {
        $this->visit('/home')
            ->seePageIs('/login')
            ->see('Register')
            ->see('Login')
            ->dontSee('Brackets')
            ->dontSee('Amdin')
            ->dontSee('Home');
    }

    /**
     * test guest can't get to brackets
     *
     * @return void
     */
    public function testGuestBrackets()
    {
        $this->visit('/brackets')
            ->seePageIs('/login')
            ->see('Register')
            ->see('Login')
            ->dontSee('Brackets')
            ->dontSee('Amdin')
            ->dontSee('Home');
    }

    /**
     * test guest can't get to admin
     *
     * @return void
     */
    public function testGuestAdmin()
    {
        $this->visit('/admin')
            ->seePageIs('/login')
            ->see('Register')
            ->see('Login')
            ->dontSee('Brackets')
            ->dontSee('Amdin')
            ->dontSee('Home');
    }

    /**
     * test user root
     *
     * @return void
     */
    public function testUserRoot()
    {
        $this->actingAs($this->user)
            ->visit('/')
            ->seePageIs('/home')
            ->dontSee('Register')
            ->dontSee('Login')
            ->see($this->user->name)
            ->see('Brackets')
            ->see('Home')
            ->dontSee('Admin');
    }

    /**
     * test user home
     *
     * @return void
     */
    public function testUserHome()
    {
        $this->actingAs($this->user)
            ->visit('/home')
            ->dontSee('Register')
            ->dontSee('Login')
            ->see($this->user->name)
            ->see('Brackets')
            ->see('Home')
            ->dontSee('Admin');
    }

    /**
     * test user brackets
     *
     * @return void
     */
    public function testUserBrackets()
    {
        $this->actingAs($this->user)
            ->visit('/brackets')
            ->dontSee('Register')
            ->dontSee('Login')
            ->see($this->user->name)
            ->see('Create Bracket') //page content
            ->see('Brackets') //navigation
            ->see('Home') //navigation
            ->dontSee('Admin');
    }

    /**
     * test user cant get to admin
     *
     * @return void
     */
    public function testUserAdmin()
    {
        try {
            $this->actingAs($this->user)
                ->visit('/admin');
        } catch (\Exception $e) {
            $this->assertResponseStatus('403');
        }
    }

    /**
     * test admin gets admin
     */
    public function testAdminAdmin()
    {
        $this->actingAs($this->admin)
            ->visit('/admin')
            ->dontSee('Register')
            ->dontSee('Login')
            ->see($this->admin->name)
            ->see('logged in as admin')
            ->see('Brackets') //navigation
            ->see('Home') //navigation
            ->see('Admin');
    }


    /**
     * test admin root
     *
     * @return void
     */
    public function testAdminRoot()
    {
        $this->actingAs($this->admin)
            ->visit('/')
            ->seePageIs('/home')
            ->dontSee('Register')
            ->dontSee('Login')
            ->see($this->admin->name)
            ->see('Brackets')
            ->see('Home')
            ->see('Admin');
    }

    /**
     * test admin home
     *
     * @return void
     */
    public function testAdminHome()
    {
        $this->actingAs($this->admin)
            ->visit('/home')
            ->dontSee('Register')
            ->dontSee('Login')
            ->see($this->admin->name)
            ->see('Brackets')
            ->see('Home')
            ->see('Admin');
    }

    /**
     * test admin brackets
     *
     * @return void
     */
    public function testAdminBrackets()
    {
        $this->actingAs($this->admin)
            ->visit('/admin/brackets')
            ->dontSee('Register')
            ->dontSee('Login')
            ->see('Master Bracket') //page content
            ->see('Brackets') //navigation
            ->see('Home') //navigation
            ->see('Admin');
    }

}
