<?php

use App\Role;
use App\Status;
use App\User;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegisterTest extends TestCase
{
    use DatabaseTransactions;

    protected $user;
    protected $unverified;

    /**
     * Sets up base user and admin for tests
     */
    public function setUp()
    {
        parent::setUp();
        $users = factory(App\User::class,2)->create();
        $users->each(function($u) {
            $u->roles()->attach(Role::where('role','user')->first()->role_id);
        });
        $this->user = $users->pop();
        $this->unverified = $users->pop();
        $this->user->status_id = Status::where('status','active')->first()->status_id;
        $this->user->save();
    }


    /**
     * test happy path registration
     *
     * @return void
     */
    public function testCorrectRegister()
    {
        $name = 'Bob';
        $email = 'bob@bob.com';
        $password = 'password';
        $this->visit('/')
            ->see('Register')
            ->click('Register')
            ->seePageIs('/register')
            ->type($name,'name')
            ->type($email,'email')
            ->type($password,'password')
            ->type($password,'password_confirmation')
            ->press('Register')
            ->seePageIs('/verify')
            ->see($name);
        $u = User::where('email',$email)->first();
        $this->assertNotNull($u);
        $this->seeInDatabase('verification_tokens',[ 'user_id' => $u->user_id ]);
    }

    /**
     * test registration failure with mismatched passwords
     *
     * @return void
     */
    public function testBadRegisterPasswordMismatch()
    {
        $name = 'Bob';
        $email = 'bob@bob.com';
        $password = 'password';
        $badpass = 'passwdrd';
        $this->visit('/')
            ->see('Register')
            ->click('Register')
            ->seePageIs('/register')
            ->type($name,'name')
            ->type($email,'email')
            ->type($password,'password')
            ->type($badpass,'password_confirmation')
            ->press('Register')
            ->seePageIs('/register');
        # TODO make sure session is has right errors
    }

    /**
     * test registration failure when email in use
     *
     * @return void
     */
    public function testBadRegisterEmailInUse()
    {
        $name = 'Bob';
        $email = 'bob@bob.com';
        $password = 'password';
        // correctly register user
        // email should have error because already in use
        $this->visit('/')
            ->see('Register')
            ->click('Register')
            ->type($name,'name')
            ->type($this->user->email,'email')
            ->type($password,'password')
            ->type($password,'password_confirmation')
            ->press('Register')
            ->seePageIs('/register');
    }

    /**
     * undocumented function
     *
     * @return void
     */
    public function testGoodLogin()
    {
        $this->actingAs($this->user)
            ->visit('/')
            ->seePageIs('/home');
        $this->actingAs($this->unverified)
            ->visit('/')
            ->see($this->unverified->name)
            ->seePageIs('/verify');
    }

    /**
     * test robot login
     *
     * @return void
     */
    public function testBotRegister()
    {
        $name = 'Bob';
        $email = 'bob@bob.com';
        $password = 'password';
        $bot = 'adfasdf';
        $this->call('POST','/register',[
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'password_confirmation' => $password,
                't' => $bot
            ]);
        $this->assertResponseStatus(302);
        $this->assertRedirectedTo('/home');
        $this->call('GET','/home');
        $this->assertResponseStatus(403);
        $u = User::where('email',$email)->first();
        $this->assertNull($u);
    }
}
