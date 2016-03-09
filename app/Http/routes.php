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

Route::get('/', 'HomeController@root');

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
    /* Master Bracket Routes */
    Route::get('/admin/brackets', 'AdminController@bracketsIndex');
    Route::get('/admin/brackets/master', 'AdminController@showMaster');
    Route::post('/admin/brackets/master', 'AdminController@createMaster');
    Route::put('/admin/brackets/master', 'AdminController@setMaster');
    /* Bracket Routes */
    Route::get('/admin/brackets/new', 'BracketController@showCreateBracketAdmin');
    Route::get('/admin/brackets/{bracket}', 'BracketController@viewBracketAdmin');
    Route::put('/admin/brackets/new','BracketController@createBracketAdmin');
    Route::put('/admin/brackets/{bracket}', 'BracketController@updateBracketAdmin');
    Route::delete('/admin/brackets/{bracket}','BracketController@destroyBracketAdmin');
    /* User Routes */
    Route::get('/admin/users', 'UserController@listUsers');
    Route::post('/admin/users/new', 'UserController@createUser');
    Route::get('/admin/users/{user}', 'UserController@viewUser');
    Route::put('/admin/users/{user}', 'UserController@updateUser');
    Route::delete('/admin/users/{user}','UserController@destroyUser');
    /* Team Routes */
    Route::get('/admin/teams', 'TeamController@listTeams');
    Route::post('/admin/team', 'TeamController@createTeam');
    Route::get('/admin/team/{team}', 'TeamController@viewTeam');
    Route::put('/admin/team/{team}', 'TeamController@updateTeam');
    Route::delete('/admin/team/{team}','TeamController@destroyTeam');
  });
  Route::group(['middleware' => ['auth','verify','role:superuser']], function() {
    Route::get('/super', 'AdminController@superIndex');
    Route::get('/super/setup', 'AdminController@revertToSetup');
    Route::get('/super/submit', 'AdminController@addDefaultRanks');
    Route::get('/super/activate', 'AdminController@closeBracketSubmission');
  });

});