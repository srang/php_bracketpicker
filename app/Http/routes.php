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
    Route::get('/brackets', 'BracketController@index');
    Route::post('/bracket', 'BracketController@store');
    Route::put('/bracket/{bracket}', 'BracketController@update');
    Route::delete('/bracket/{bracket}','BracketController@destroy');
    Route::get('/home', 'HomeController@index');
  });
  Route::group(['middleware' => ['auth','role:admin']], function() {
    Route::get('/admin', 'AdminController@index');
    Route::get('/admin/bracket', 'AdminController@showMaster');
    Route::post('/admin/bracket', 'AdminController@createMaster');
    Route::put('/admin/bracket', 'AdminController@setMaster');
    Route::get('/admin/teams', 'AdminController@listTeams');
    Route::get('/admin/users', 'AdminController@listUsers');
    Route::post('/admin/team', 'AdminController@createTeam');
    Route::get('/admin/team/{team}', 'AdminController@viewTeam');
    Route::put('/admin/team/{team}', 'AdminController@updateTeam');
    Route::delete('/admin/team/{team}','AdminController@destroyTeam');
  });

});
