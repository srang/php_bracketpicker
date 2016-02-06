<?php

namespace App\Http\Controllers;

use App\Team;
use App\Bracket;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminController extends Controller
{
    /**
     * Display admin home page
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        return view('admin.index');
    }

    public function showMaster(Request $request)
    {
        $bracket = Bracket::where('master',true)->first();
        return view('admin.bracket',[
            'master' => $bracket
        ]);
    }

    public function setMaster(Request $request)
    {
        // $this->validate($request, [
        // game1 => 'required'
        // ...
        // ]);

        return redirect()->action('AdminController@showMaster');
    }

    public function listTeams(Request $request)
    {
        $teams = Team::all();
        return view('admin.teams',[
            'teams' => $teams
        ]);
    }

    public function createTeam(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'mascot' => 'max:255',
            'primary_color' => 'max:6',
            'accent_color' => 'max:6'
        ]);
        // save team
        Team::create([
            'name' => $request->name,
            'mascot' => $request->mascot,
            'icon_path' => '/path/to/icon',
            'primary_color' => $request->primary_color,
            'accent_color' => $request->accent_color
        ]);

        return redirect()->action('AdminController@listTeams');
    }

    public function updateTeam(Request $request, Team $team)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'mascot' => 'max:255',
            'primary_color' => 'max:6',
            'accent_color' => 'max:6'
        ]);

        //save team

        return redirect()->action('AdminController@listTeams');
    }

    public function destroyTeam(Request $request, Team $team)
    {
        // delete team

        return redirect()->action('AdminController@listTeams');
    }

}
