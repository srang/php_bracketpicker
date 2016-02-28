<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class PostController extends Controller
{

    /**
     * Display standings
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        return view('posts.index');
    }

}
