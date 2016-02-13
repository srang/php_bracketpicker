<?php

use App\User;
use App\Role;
use App\Status;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    /**
     * Test user creation
     *
     * @return void
     */
    public function testUserCreate()
    {
        $name = 'Bob';
        $email = 'bob@bob.com';
        $password = 'password';
        $u = new User([
            'name' => $name,
            'email' => $email,
            'status_id' => Status::where('status','unverified')->first()->status_id,
            'password' => bcrypt($password),
        ]);
        $this->assertInstanceOf('App\User',$u);
        $this->assertEquals($u->email, $email);
        $this->assertEquals($u->name, $name);
        // make sure encrypted
        $this->assertNotEquals($u->password, $password);
        $this->assertEquals($u->status->status,'unverified');
    }

    /**
     * Test user persistence
     *
     * @return void
     */
    public function testUserSave()
    {
        $name = 'Bob';
        $email = 'bob@bob.com';
        $password = 'password';
        $u = new User([
            'name' => $name,
            'email' => $email,
            'status_id' => Status::where('status','unverified')->first()->status_id,
            'password' => bcrypt($password),
        ]);
        $u->save();
        $r = Role::where('role','user')->first();
        $u->roles()->attach($r->role_id);
        $this->seeInDatabase('users',[
            'email'=>$email,
            'name' =>$name
        ]);
        $this->seeInDatabase('userroles',[
            'user_id' => $u->user_id,
            'role_id' => $r->role_id
        ]);
        $this->assertTrue($u->hasRole('user'));
    }
}
