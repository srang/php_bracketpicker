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
use App\Strategies\UpdateMasterBracketStrategy;
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
            $teams = Team::where('name','<>','TBD')->select('name','team_id')->get();
            $regions = Region::where('region','<>','')->get();
            JavaScript::put([
                'teams' => $teams,
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

    /**
     * Update master bracket redirects to master bracket view page
     *
     * @param  Request  $request
     * @return Response
     */
    public function setMaster(Request $request)
    {
        $errors = BracketFactory::validateBracket($request,new ValidateMasterUpdateBracketStrategy($this->teamRepo));
        if ($errors->count() > 0) {
            return redirect('admin/brackets/master')->withInput()->withErrors($errors);
        }
        // create user bracket
        DB::beginTransaction();

        $master = Bracket::where('master',1)->first();
        $bracket_updated = BracketFactory::createBracket($request, new UpdateMasterBracketStrategy($this->teamRepo));

        if (isset($bracket_updated)) {
            $bracket_updated->name = $request->name;
            $bracket_updated->save();
            $master->delete();
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

        return redirect('admin/brackets/master');
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

    public function closeBracketSubmission(Request $request)
    {
        $tournament = Tournament::where('active',true)->first();
        $tournament->state_id = State::where('name','active')->first()->state_id;
        $tournament->save();
    }

}