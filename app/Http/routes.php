<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return redirect('home');
})->middleware(['guest']);

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
  Route::auth();
  Route::group(['middleware' => ['auth','role:user']], function() {
      Route::get('/verify/{token}','HomeController@verifyUser');
      Route::get('/verify','HomeController@showUnverified');
      Route::get('/reverify','HomeController@reverify');
      Route::get('/feedback','HomeController@showFeedback');
      Route::get('/disabled', 'HomeController@showDisabled');
  });
  Route::group(['middleware' => ['auth','verify','role:user']], function() {
    Route::get('/brackets', 'BracketController@index');
    Route::get('/brackets/new', 'BracketController@showCreateBracket');
    Route::get('/brackets/{bracket}', 'BracketController@viewBracket');
    Route::put('/brackets/new','BracketController@createBracket');
    Route::put('/brackets/{bracket}', 'BracketController@updateBracket');
    Route::delete('/brackets/{bracket}','BracketController@destroyBracket');
    Route::get('/home', 'HomeController@index');
    Route::get('/standings', 'ScoreController@index');
    Route::get('/posts','PostController@index');
  });
  Route::group(['middleware' => ['auth','verify','role:admin']], function() {
    Route::get('/admin', 'AdminController@index');
    Route::get('/admin/brackets', 'AdminController@bracketsIndex');
    Route::get('/admin/brackets/master', 'AdminController@showMaster');
    Route::post('/admin/brackets/master', 'AdminController@createMaster');
    Route::put('/admin/brackets/master', 'AdminController@setMaster');
    Route::get('/admin/brackets/new', 'AdminController@createUserBracket');
    Route::get('/admin/brackets/{bracket}', 'AdminController@viewBracket');
    Route::put('/admin/brackets/new','AdminController@createBracket');
    Route::put('/admin/brackets/{bracket}', 'AdminController@updateBracket');
    Route::delete('/admin/brackets/{bracket}','AdminController@destroyBracket');
    Route::get('/admin/teams', 'AdminController@listTeams');
    Route::get('/admin/users', 'AdminController@listUsers');
    Route::post('/admin/team', 'AdminController@createTeam');
    Route::get('/admin/team/{team}', 'AdminController@viewTeam');
    Route::put('/admin/team/{team}', 'AdminController@updateTeam');
    Route::delete('/admin/team/{team}','AdminController@destroyTeam');
  });

});