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

    /**
     * Show master bracket unless needs to be created
     * in which case, redirect to showCreateMaster
     *
     * @param  Request  $request
     * @return Response
     */
    public function showMaster(Request $request)
    {
        $bracket = Bracket::where('master',true)->first();
        if(empty($bracket)) {
            //need to set up master bracket
            $teams = Team::all();
            return view('admin.create_master',[
                'teams' => $teams
            ]);
        }
        return view('admin.bracket',[
            'master' => $bracket
        ]);
    }

    public function createMaster(Request $request)
    {
        // $this->validate($request, [
        // game1 => 'required'
        // ...
        // ]);

        $alert = [
            'message' => 'Save successful',
            'level' => 'success'
        ];
        $request->session()->put('alert', $alert);

        return redirect()->action('AdminController@showMaster');
    }

    public function setMaster(BracketSetRequest $request)
    {
        $master = Bracket::where('master',true)->first();
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
            'primary_color' => array('regex:/^([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/'),
            'accent_color' => array('regex:/^([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/')
        ]);
        // save team
        Team::create([
            'name' => $request->name,
            'mascot' => $request->mascot,
            'icon_path' => '/path/to/icon',
            'primary_color' => $request->primary_color,
            'accent_color' => $request->accent_color
        ]);
        $alert = [
            'message' => 'Save successful',
            'level' => 'success'
        ];

        return redirect()->action('AdminController@listTeams');
    }

    public function viewTeam(Request $request, Team $team)
    {
        return view('admin.team_details',[
            'old' => [
                'name'=>$team->name,
                'mascot'=>$team->mascot,
                'primary_color'=>$team->primary_color,
                'accent_color'=>$team->accent_color
            ],
            'team' => $team
        ]);
    }

    public function updateTeam(Request $request, Team $team)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'mascot' => 'max:255',
            'primary_color' => 'max:6',
            'accent_color' => 'max:6'
        ]);

        $team->name = $request->name;
        $team->mascot = $request->mascot;
        $team->primary_color = $request->primary_color;
        $team->accent_color = $request->accent_color;

        $team->save();

        $alert = [
            'message' => 'Save successful',
            'level' => 'success'
        ];
        $request->session()->put('alert', $alert);

        return redirect()->action('AdminController@listTeams');
    }

    public function destroyTeam(Request $request, Team $team)
    {
        $name = $team->name;
        $team->delete();

        $alert = [
            'message' => 'Team ('.$name.') deleted',
            'level' => 'warning'
        ];
        $request->session()->put('alert', $alert);

        return redirect()->action('AdminController@listTeams');
    }

}
