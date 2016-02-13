<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegisterTest extends TestCase
{
    use DatabaseTransactions;

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
            ->seePageIs('/home')
            ->see('Hello, '.$name);
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
        $this->visit('/')
            ->see('Register')
            ->click('Register')
            ->seePageIs('/register')
            ->type($name,'name')
            ->type($email,'email')
            ->type($password,'password')
            ->type($password,'password_confirmation')
            ->press('Register')
            ->seePageIs('/home');
        // email should have error because already in use
        $this->visit('/logout')
            ->see('Register')
            ->click('Register')
            ->type($name,'name')
            ->type($email,'email')
            ->type($password,'password')
            ->type($password,'password_confirmation')
            ->press('Register')
            ->seePageIs('/register');
    }
}
