<?php

namespace App\Http\Controllers;

use Log;
use DB;
use JavaScript;
use App\Team;
use App\User;
use App\Bracket;
use App\Game;
use App\Region;
use App\Tournament;
use App\State;
use App\Factories\BracketFactory;
use App\Strategies\CreateMasterBracketStrategy;
use App\Strategies\CreateBaseBracketStrategy;
use App\Strategies\ReverseBaseBracketStrategy;
use App\Strategies\ValidateBaseBracketStrategy;
use App\Strategies\ValidateAdminCreateBracketStrategy;
use App\Strategies\ValidateAdminUpdateBracketStrategy;
use App\Strategies\ValidateMasterUpdateBracketStrategy;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Repositories\TeamRepository;

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
            $teams = Team::where('name','<>','TBD')->get();
            $regions = Region::where('region','<>','')->get();
            $teamarray = [];
            JavaScript::put([
                'teams' => $teams,
                'blah' => 'blah'
            ]);
            return view('admin.create_master',[
                'teamRepo' => $this->teamRepo,
                'teams' => $teams,
                'regions' => $regions,
                'region_size' => 16,
            ]);
        }
        $games = BracketFactory::reverseBracket($bracket,new ReverseBaseBracketStrategy());
        $regions = Region::where('region','<>','')->get();
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

        $team_names = collect([]);
        foreach ($request->team as $region => $teams) {
            foreach ($teams as $rank => $team) {
                if(!empty($team) && !$team_names->contains($team)) {
                    Log::debug('Team: '.$team.' found in form with region: '.$region.' and rank: '.$rank);
                    $team_actual = $this->teamRepo->byName($team);
                    // check if update
                    if($team_actual->region->region != $region || $team_actual->rank != $rank) {
                        Log::debug('Updating team: '.$team.' from rank: '.$team_actual->rank.' to '.$rank.' and region: '.$team_actual->region->region.' to '.$region);
                        $team_names->push($team);
                        $team_actual->setRegionRank($region,$rank);
                    }
                }
            }
        }

        $alert = [
            'message' => 'Save Successful',
            'level' => 'success'
        ];

        if ($request->start_madness==='true') {
            DB::beginTransaction();

            $bracket = BracketFactory::createBracket($request, new CreateMasterBracketStrategy($this->teamRepo));

            if (isset($bracket)) {
                $tournament = Tournament::where('active',true)->first();
                // TODO just use next
                // $tournament->state_id = $tournament->state->next->state_id;
                $tournament->state_id = State::where('name','submission')->first()->state_id;
                $tournament->save();
                $bracket->name = 'Master Bracket';
                $bracket->save();
                DB::commit();
                $alert = [
                    'message' => 'Save Successful. Bracket submission is open',
                    'level' => 'success'
                ];
            } else {
                DB::rollBack();
                $alert = [
                    'message' => 'Save successful but unable to start tournament due to problems with the master bracket as a whole',
                    'level' => 'danger'
                ];
            }


        }
        $request->session()->put('alert', $alert);

        return redirect()->action('AdminController@showMaster');
    }

    public function setMaster(Request $request)
    {

        $errors = BracketFactory::validateBracket($request,new ValidateMasterUpdateBracketStrategy($this->teamRepo));
        return redirect()->action('AdminController@showMaster')->withInput()->withErrors($errors);
    }

    public function listTeams(Request $request)
    {
        $teams = Team::where('name','<>','TBD')->get();
        $regions = Region::all();
        return view('admin.teams',[
            'teams' => $teams,
            'regions' => $regions
        ]);
    }

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

        return redirect()->action('AdminController@listTeams');
    }

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

    public function listUsers(Request $request)
    {
        // TODO track user payments
        $users = User::all();
        return view('admin.users',[
            'users' => $users,
        ]);
    }

    public function viewBracket(Request $request, Bracket $bracket)
    {
        // pass bracketbutton/bracketlabel based on tournament state?
        $games = BracketFactory::reverseBracket($bracket,new ReverseBaseBracketStrategy());
        $regions = Region::where('region','<>','')->get();
        $user = $bracket->user;
        $rounds = count($games);
        return view('brackets.bracket_display',[
            'teamRepo' => $this->teamRepo,
            'bracket' => $bracket,
            'master' => false,
            'games' => $games,
            'regions' => $regions,
            'user' => $user,
            'game_container' => 'brackets.game_buttons',
            'bracket_link' => url('admin/brackets/'.$bracket->bracket_id),
            'back_link' => url('admin/brackets')
        ]);
    }

    /**
     * validate submitted bracket conforms to rules
     *
     */
    public function createBracket(Request $request)
    {
        $errors = BracketFactory::validateBracket($request,new ValidateAdminCreateBracketStrategy($this->teamRepo));
        if ($errors->count() > 0) {
            return redirect()->action('AdminController@createUserBracket')->withInput()->withErrors($errors);
        }
        // create user bracket
        DB::beginTransaction();

        $bracket = BracketFactory::createBracket($request, new CreateBaseBracketStrategy($this->teamRepo));

        if (isset($bracket)) {
            $bracket->name = $request->name;
            $bracket->user_id = $request->user_id;
            $bracket->save();
            DB::commit();
            $alert = [
                'message' => 'Save Successful.',
                'level' => 'success'
            ];
        } else {
            DB::rollBack();
            $alert = [
                'message' => 'Save unsuccessful',
                'level' => 'danger'
            ];
        }

        $request->session()->put('alert', $alert);
        return redirect()->action('AdminController@bracketsIndex');
    }

    /**
     * display form for creating a bracket for a user
     *
     */
    public function createUserBracket(Request $request)
    {
        $bracket = Bracket::where('master',true)->first();
        $users = User::all();
        $games = BracketFactory::reverseBracket($bracket,new ReverseBaseBracketStrategy());
        $regions = Region::where('region','<>','')->get();
        $rounds = count($games);
        return view('brackets.bracket_display',[
            'teamRepo' => $this->teamRepo,
            'bracket' => $bracket,
            'master' => false,
            'games' => $games,
            'regions' => $regions,
            'users' => $users,
            'game_container' => 'brackets.game_buttons',
            'bracket_link' => url('admin/brackets/new'),
            'back_link' => url('admin/brackets')
        ]);
    }

    public function updateBracket(Request $request, Bracket $bracket)
    {
        $errors = BracketFactory::validateBracket($request,new ValidateAdminUpdateBracketStrategy($this->teamRepo));
        if ($errors->count() > 0) {
            return redirect('admin/brackets/'.$bracktet->bracket_id)->withInput()->withErrors($errors);
        }
        // create user bracket
        DB::beginTransaction();

        $bracket_updated = BracketFactory::createBracket($request, new CreateBaseBracketStrategy($this->teamRepo));

        if (isset($bracket_updated)) {
            $bracket_updated->name = $request->name;
            $bracket_updated->user_id = $request->user_id;
            $bracket_updated->save();
            // update just creates new and deletes old
            // consider revisiting this later
            $bracket->delete();
            DB::commit();
            $alert = [
                'message' => 'Save Successful.',
                'level' => 'success'
            ];
        } else {
            DB::rollBack();
            $alert = [
                'message' => 'Save unsuccessful',
                'level' => 'danger'
            ];
        }

        $request->session()->put('alert', $alert);
        return redirect('admin/brackets');

    }

    public function bracketsIndex(Request $request)
    {
        $master = Bracket::where('master',1)->first();
        $brackets = Bracket::where('master',0)->get();
        if (isset($master)) {
            $game = $master->root;
            return view('admin.brackets_home',[
                'gamer' => $game,
                'master' => $master,
                'brackets' => $brackets
            ]);
        }
        return view('admin.brackets_home',[
            'brackets' => $brackets
        ]);

    }

    public function destroyBracket(Request $request, Bracket $bracket)
    {
        $name = $bracket->name;
        $bracket->delete();

        $alert = [
            'message' => 'Bracket ('.$name.') deleted',
            'level' => 'warning'
        ];
        $request->session()->put('alert', $alert);

        return redirect()->action('AdminController@bracketsIndex');
    }

    public function closeBracketSubmission(Request $request)
    {
        $tournament = Tournament::where('active',true)->first();
        $tournament->state_id = State::where('name','active')->first()->state_id;
        $tournament->save();
    }

}