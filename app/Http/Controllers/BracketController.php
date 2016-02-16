<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class BracketController extends Controller
{
  /**
   * Create new bracket controller
   * @return void
   */
  public function __construct()
  {
  }

  /**
   * Display a list of users brackets
   *
   * @param  Request  $request
   * @return Response
   */
  public function index(Request $request)
  {
    return view('brackets.index');
  }

  public function submitBracket(Request $request)
  {

  }
}
