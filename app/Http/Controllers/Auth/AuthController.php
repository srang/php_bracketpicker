<?php

namespace App\Http\Controllers\Auth;

use Log;
use App\User;
use App\UserRole;
use App\Role;
use App\Status;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        //TODO make atomic so if user role fails there isn't a half created user
        $user = new User([
            'name' => $data['name'],
            'email' => $data['email'],
            // users need to follow email verification before becoming 'active'
            'status_id' => Status::where('status','unverified')->first()->status_id,
            'password' => bcrypt($data['password']),
        ]);
        $user->save();
        $user->roles()->attach(Role::where('role','user')->first()->role_id);
        Log::info('Created user: '.$user->email.' with roles: '.$user->roles);
        return $user;
    }
}
