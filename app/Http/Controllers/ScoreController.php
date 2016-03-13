<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Log;
use Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ScoreController extends Controller
{

    /**
     * Display standings
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        return view('scores.index',[ 'user' => Auth::user() ]);
    }

}
