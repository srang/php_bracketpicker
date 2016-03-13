<?php

namespace App\Http\Controllers;

use Log;
use Auth;
use App\Http\Requests;
use Illuminate\Http\Request;

class PostController extends Controller
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
        return view('posts.index',[ 'user' => Auth::user() ]);
    }
}