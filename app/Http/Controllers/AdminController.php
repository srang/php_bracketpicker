<?php

namespace App\Http\Controllers;

use App\Team;
use App\User;
use App\Bracket;
use App\Game;
use App\Region;
use App\Tournament;
use App\State;
use App\Task;
use App\Factories\BracketFactory;
use App\Strategies\CreateMasterBracketStrategy;
use App\Strategies\UpdateMasterBracketStrategy;
use App\Strategies\ReverseBaseBracketStrategy;
use App\Strategies\ValidateMasterUpdateBracketStrategy;
use App\Strategies\ValidateMasterCreateBracketStrategy;
use App\Jobs\ValidateBracket;
use App\Repositories\TeamRepository;

use Log;
use DB;
use JavaScript;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class AdminController extends Controller
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
            $teams = Team::where('name','<>','TBD')->select('name','team_id')->get();
            $regions = Region::orderedRegions();
            $game_nums = BracketFactory::generateMatchups();
            JavaScript::put([
                'teams' => $teams,
            ]);
            return view('admin.create_master',[
                'matchups' => $game_nums,
                'teamRepo' => $this->teamRepo,
                'teams' => $teams,
                'regions' => $regions,
                'region_size' => 16,
            ]);
        }
        $games = BracketFactory::reverseBracket($bracket,new ReverseBaseBracketStrategy());
        $regions = Region::orderedRegions();
        $rounds = count($games);
        return view('brackets.bracket_display',[
            'teamRepo' => $this->teamRepo,
            'bracket' => $bracket,
            'master' => true,
            'games' => $games,
            'regions' => $regions,
            'game_container' => 'brackets.game_buttons',
            'bracket_link' => url('admin/brackets/master'),
            'back_link' => url('admin/brackets')
        ]);
    }

    public function printMaster(Request $request)
    {
        $master = Bracket::where('master',true)->first();
        if(empty($master)) {
            $alert = [
                'message' => 'Master Bracket Not Created',
                'level' => 'danger'
            ];
            $request->session()->put('alert', $alert);
            return redirect('/admin/brackets/master');
        }
        return redirect('/admin/brackets/'.$master->bracket_id.'/print');

    }

    /**
     * Validate all constraints are met and then save
     * master bracket. Check for start tournament flag
     *
     * @param  Request  $request
     * @return Response
     */
    public function createMaster(Request $request)
    {
        if ($request->start_madness==='true') {
            Log::debug('Master initiation request received');
            $this->validate($request, [
                'team.South.*' => 'required|exists:teams,name',
                'team.East.*' => 'required|exists:teams,name',
                'team.West.*' => 'required|exists:teams,name',
                'team.Midwest.*' => 'required|exists:teams,name',
            ]);
        } else {
            Log::debug('Master creation request received');
            $this->validate($request, [
                'team.South.*' => 'exists:teams,name',
                'team.East.*' => 'exists:teams,name',
                'team.West.*' => 'exists:teams,name',
                'team.Midwest.*' => 'exists:teams,name',
            ]);
        }

        $alert = $this->saveTeams($request);

        if ($request->start_madness==='true') {

            // if needs to be async
            $this->dispatch(new ValidateBracket($request,
                new ValidateMasterCreateBracketStrategy($this->teamRepo),
                new CreateMasterBracketStrategy($this->teamRepo)));
            $alert = [
                'message' => 'Master Bracket Processing',
                'level' => 'warning'
            ];
            $request->session()->put('alert', $alert);
            //$alert = BracketFactory::createBracket($request, new CreateMasterBracketStrategy($this->teamRepo));
            return redirect('/admin/brackets');

        }
        $request->session()->put('alert', $alert);

        return redirect('/admin/brackets/master');
    }

    /**
     * Update master bracket redirects to master bracket view page
     *
     * @param  Request  $request
     * @return Response
     */
    public function setMaster(Request $request)
    {
        $master = Bracket::where('master',1)->first();
        $this->dispatch(new ValidateBracket($request,
            new ValidateMasterUpdateBracketStrategy($this->teamRepo),
            new UpdateMasterBracketStrategy($this->teamRepo, $master)));
        $alert = [
            'message' => 'Master Bracket Update Processing',
            'level' => 'warning'
        ];

        $request->session()->put('alert', $alert);

        return redirect('/admin/brackets');
    }

    /**
     * View list of brackets created for/by users
     *
     * @param  Request  $request
     * @return Response
     */
    public function bracketsIndex(Request $request)
    {
        $master = Bracket::where('master',1)->first();
        $brackets = Bracket::where('master',0)->get();
        $tasks = Task::all();
        if (isset($master)) {
            $game = $master->root;
            return view('admin.brackets_home',[
                'gamer' => $game,
                'master' => $master,
                'tasks' => $tasks,
                'brackets' => $brackets
            ]);
        }
        return view('admin.brackets_home',[
            'tasks' => $tasks,
            'brackets' => $brackets
        ]);
    }

    /* SUPER USER */

    public function superIndex(Request $request)
    {
        return view('admin.super_index');
    }

    public function revertToSetup(Request $request)
    {
        $this->resetSetup();
        return redirect('/super');
    }

    public function addDefaultRanks(Request $request)
    {

        $this->resetSetup();
        $this->setBaseRanks();

        //BracketFactory::createBracket($req, new CreateMasterBracketStrategy($this->teamRepo));
        return redirect('/admin/brackets/master');
    }


    public function submitMasterBracket()
    {
        $this->resetSetup();
        $this->setBaseRanks(true);
        return redirect('/admin');
    }

    public function closeBracketSubmission(Request $request)
    {
        $tournament = Tournament::where('active',true)->first();
        if ($tournament->state == 'setup') {
            $this->resetSetup();
            $this->setBaseRanks();
        }
        $tournament->state_id = State::where('name','active')->first()->state_id;
        $tournament->save();
        return redirect('/admin/brackets');
    }


    /* HELPER FUNCTIONS */
    private function saveTeams($request)
    {
        Log::info($request);
        $team_names = collect([]);
        foreach ($request->get('team') as $region => $teams) {
            foreach ($teams as $rank => $team) {
                if(!empty($team) && !$team_names->contains($team)) {
                    $team_actual = $this->teamRepo->byName($team);
                    if($team_actual->region->region != $region || $team_actual->rank != $rank) {
                        Log::debug('Updating team: '.$team.' from rank: '.$team_actual->rank.
                            ' to '.$rank.' and region: '.$team_actual->region->region.' to '.$region);
                        $team_names->push($team);
                        $team_actual->setRegionRank($region,$rank);
                    }
                }
            }
        }

        return [
            'message' => 'Save Successful',
            'level' => 'success'
        ];
    }

    private function resetSetup()
    {
        $null_region = Region::where('region','')->first()->region_id;
        DB::table('teams')->update([
            'region_id' => $null_region,
            'rank' => NULL
        ]);
        $tbds = Team::where('name','TBD')->get();
        $regions = Region::orderedRegions();
        foreach($tbds as $tbd) {
            $tbd->region()->associate($regions->pop())->save();
        }
        DB::table('tasks')->delete();
        DB::table('jobs')->delete();
        DB::table('brackets')->delete();
        $tournament = Tournament::where('active',true)->first();
        $tournament->state_id = State::where('name','setup')->first()->state_id;
        $tournament->save();
    }

    private function setBaseRanks($start=false)
    {
        $req = collect(array(
            'start_madness' => 'true',
            'name' => 'Master Bracket',
            'team' => array (
                'East' => array (
                    1 => 'Villanova',
                    16 => 'Bucknell',
                    8 => 'Pittsburgh',
                    9 => 'USC',
                    5 => 'Texas A&M',
                    12 => 'Temple',
                    4 => 'Maryland',
                    13 => 'Yale',
                    6 => 'Arizona',
                    11 => 'Monmouth',
                    3 => 'West Virginia',
                    14 => 'Hofstra',
                    7 => 'Seton Hall',
                    10 => 'VCU',
                    2 => 'Miami (FL)',
                    15 => 'Weber State',
                ),
                'West' => array (
                    1 => 'North Carolina',
                    16 => 'Hampton',
                    8 => 'Texas Tech',
                    9 => 'Vanderbilt',
                    5 => 'Purdue',
                    12 => 'Valparaiso',
                    4 => 'Kentucky',
                    13 => 'Stony Brook',
                    6 => 'Baylor',
                    11 => 'Michigan',
                    3 => 'Oregon',
                    14 => 'Belmont',
                    7 => 'Wisconsin',
                    10 => 'Providence',
                    2 => 'Oklahoma',
                    15 => 'New Mexico State',
                ),
                'South' => array (
                    1 => 'Virginia',
                    16 => 'North Florida',
                    8 => 'Saint Joseph\'s',
                    9 => 'South Carolina',
                    5 => 'California',
                    12 => 'Arkansas-Little Rock',
                    4 => 'Iowa State',
                    13 => 'Hawaii',
                    6 => 'Texas',
                    11 => 'Saint Mary\'s',
                    3 => 'Utah',
                    14 => 'Stephen F. Austin',
                    7 => 'Dayton',
                    10 => 'Cincinnati',
                    2 => 'Michigan State',
                    15 => 'UAB',
                ),
                'Midwest' => array (
                    1 => 'Kansas State',
                    16 => 'Kansas',
                    8 => 'Colorado',
                    9 => 'Syracuse',
                    5 => 'Iowa',
                    12 => 'San Diego State',
                    4 => 'Duke',
                    13 => 'Akron',
                    6 => 'Notre Dame',
                    11 => 'Oregon State',
                    3 => 'Indiana',
                    14 => 'Chattanooga',
                    7 => 'Wichita St',
                    10 => 'Connecticut',
                    2 => 'Xavier',
                    15 => 'Texas Southern',
                ),
            ),
        ));
        $this->saveTeams($req);
        if ($start) {
            BracketFactory::createBracket($req, new CreateMasterBracketStrategy($this->teamRepo));
        }
    }
}