<?php

namespace App\Http\Controllers;

use App\Team;
use App\User;
use App\Bracket;
use App\Game;
use App\Region;
use App\Tournament;
use App\State;
use App\Factories\BracketFactory;
use App\Strategies\CreateMasterBracketStrategy;
use App\Strategies\UpdateMasterBracketStrategy;
use App\Strategies\ReverseBaseBracketStrategy;
use App\Strategies\ValidateMasterUpdateBracketStrategy;
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
            $regions = Region::where('region','<>','')->get();
            $game_nums = $this->generateMatchups();
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

        $alert = $this->saveTeams($request);

        if ($request->start_madness==='true') {

            // if needs to be async
            //$this->dispatch(new ValidateBracket($request,
            //    new <master create validator>($this->teamRepo),
            //    new CreateMasterBracketStrategy($this->teamRepo)));
            //$alert = [
            //    'message' => 'Master Bracket Processing',
            //    'level' => 'warning'
            //];
            $alert = BracketFactory::createBracket($request, new CreateMasterBracketStrategy($this->teamRepo));
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

    private function saveTeams($request)
    {
        $team_names = collect([]);
        foreach ($request->team as $region => $teams) {
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

    private function generateMatchups()
    {
        $first_teams = collect(range(1,8));
        $ret = collect([]);
        while (($c=$first_teams->count()) > 1) {
            if (($c + 1) % 2) {
                $hold = $first_teams->shift();
                $ret->prepend($first_teams->shift());
                $first_teams->prepend($hold);
            } else {
                $hold = $first_teams->pop();
                $ret->prepend($first_teams->pop());
                $first_teams->push($hold);
            }
        }
        $r = $first_teams->pop();
        $ret->prepend($r);
        return $ret;
    }

}