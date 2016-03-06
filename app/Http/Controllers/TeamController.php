<?php

namespace App\Http\Controllers;

use App\Region;
use App\Team;
use App\Repositories\TeamRepository;

use Log;
use Auth;
use DB;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class TeamController extends Controller
{
    /**
     * The team repository instance
     *
     * @var TeamRepository
     */
    protected $teamRepo;

    /**
     * Create a new controller instance.
     *
     * @param  TeamRepository  $teams
     * @return void
     */
    public function __construct(TeamRepository $teams)
    {
        $this->teamRepo = $teams;
    }


    /**
     * view list of teams
     *
     * @param  Request  $request
     * @return Response
     */
    public function listTeams(Request $request)
    {
        $teams = Team::where('name','<>','TBD')->get();
        $regions = Region::all();
        return view('admin.teams',[
            'teams' => $teams,
            'regions' => $regions
        ]);
    }

    /**
     * Create a new team, redirects back to team listing
     *
     * @param  Request  $request
     * @return Response
     */
    public function createTeam(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:teams,name|max:255',
            'mascot' => 'max:255',
            'primary_color' => array('regex:/^([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/'),
            'accent_color' => array('regex:/^([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/'),
            'region' => 'exists:regions,region',
            'rank' => 'between:0,17'
        ]);
        // save team
        Team::create([
            'name' => $request->name,
            'mascot' => $request->mascot,
            'icon_path' => '/path/to/icon',
            'primary_color' => $request->primary_color,
            'accent_color' => $request->accent_color,
            'region_id' => Region::where('region',$request->region)->first()->region_id,
            'rank' => $request->rank,
        ]);
        $alert = [
            'message' => 'Save Successful',
            'level' => 'success'
        ];
        $request->session()->put('alert', $alert);

        return redirect('/admin/teams');
    }

    /**
     * View a teams details
     *
     * @param  Request  $request
     * @return Response
     */
    public function viewTeam(Request $request, Team $team)
    {
        $regions = Region::all();
        return view('admin.team_details',[
            'old' => [
                'name'=>$team->name,
                'mascot'=>$team->mascot,
                'primary_color'=>$team->primary_color,
                'accent_color'=>$team->accent_color,
                'rank'=>$team->rank,
                'region'=>$team->region
            ],
            'regions' => $regions,
            'team' => $team
        ]);
    }

    /**
     * Update teams details, redirects back to team listing
     *
     * @param  Request  $request
     * @return Response
     */
    public function updateTeam(Request $request, Team $team)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'mascot' => 'max:255',
            'primary_color' => array('regex:/^([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/'),
            'accent_color' => array('regex:/^([a-fA-F0-9]){3}(([a-fA-F0-9]){3})?$/'),
            'region' => 'exists:regions,region',
            'rank' => 'between:0,17'
        ]);

        // check if more than one team has name (include self)
        if (!empty($team_check=$this->teamRepo->byName($request->name)) && $team_check->team_id != $team->team_id) {
            $alert = [
                'message' => 'Team name already in use elsewhere',
                'level' => 'danger'
            ];
            $request->session()->put('alert', $alert);
            return redirect('/admin/team/'.$team->team_id)->withInput();
        }

        $team->name = $request->name;
        $team->mascot = $request->mascot;
        $team->primary_color = $request->primary_color;
        $team->accent_color = $request->accent_color;
        $team->setRegionRank($request->region, $request->rank);

        $team->save();

        $alert = [
            'message' => 'Save Successful',
            'level' => 'success'
        ];
        $request->session()->put('alert', $alert);

        return redirect('/admin/teams');
    }

    /**
     * Remove a team, redirect back to team list
     *
     * @param  Request  $request
     * @return Response
     */
    public function destroyTeam(Request $request, Team $team)
    {
        $name = $team->name;
        $team->delete();

        $alert = [
            'message' => 'Team ('.$name.') deleted',
            'level' => 'warning'
        ];
        $request->session()->put('alert', $alert);

        return redirect('/admin/teams');
    }

}
