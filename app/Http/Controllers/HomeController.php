<?php

namespace App\Http\Controllers;

use Log;
use Auth;
use Carbon\Carbon;
use App\Status;
use App\VerificationToken;
use App\Http\Requests;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        return view('home',[
          'user' => $user,
        ]);
    }

    public function verifyUser(Request $request, $token)
    {
        $verification = VerificationToken::where('token',$token)->first();
        if(isset($verification) && !$verification->expired() && $verification->user_id == Auth::user()->user_id) {
            $user = Auth::user();
            Log::info($user->name.' has verified their email. Deleting token');
            // delete token
            $verification->delete();
            // set user status active
            $user->status_id = Status::where('status','active')->first()->status_id;
            $user->save();
            return redirect('/home');
        }
        return redirect()->guest('/verify');
    }

    public function showUnverified(Request $request)
    {
        $user = Auth::user();
        if ($user->confirmed()) {
            return redirect('/home');
        }
        return view('unverified',[
            'user' => $user
        ]);
    }

    public function showDisabled(Request $request)
    {
        $user = Auth::user();
        return view('disabled',[
            'user' => $user
        ]);
    }

}
