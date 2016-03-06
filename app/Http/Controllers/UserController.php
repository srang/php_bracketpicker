<?php

namespace App\Http\Controllers;

use App\Bracket;
use App\Region;
use App\Team;
use App\User;

use Log;
use Auth;
use DB;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * List users and payment info
     */
    public function listUsers(Request $request)
    {
        // TODO track user payments
        $users = User::all();
        return view('admin.users',[
            'users' => $users,
        ]);
    }
}
