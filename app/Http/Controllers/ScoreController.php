<?php

namespace App\Http\Controllers;

use App\Bracket;

use Log;
use Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
