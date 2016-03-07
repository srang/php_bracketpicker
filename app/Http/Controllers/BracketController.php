<?php

namespace App\Http\Controllers;

use App\Bracket;
use App\Region;
use App\Team;
use App\User;
use App\Repositories\TeamRepository;
use App\Factories\BracketFactory;
use App\Strategies\CreateBaseBracketStrategy;
use App\Strategies\UpdateBaseBracketStrategy;
use App\Strategies\ReverseBaseBracketStrategy;
use App\Strategies\ValidateBaseBracketStrategy;
use App\Strategies\ValidateUserUpdateBracketStrategy;
use App\Strategies\ValidateUserCreateBracketStrategy;
use App\Strategies\ValidateAdminCreateBracketStrategy;
use App\Strategies\ValidateAdminUpdateBracketStrategy;
use App\Jobs\ValidateBracket;

use JavaScript;
use Log;
use Auth;
use DB;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class BracketController extends Controller
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
     * USER BRACKET SECTION
     */

    /**
     * Display a list of users brackets
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $brackets = Bracket::where('user_id',$user->user_id)->get();
        return view('brackets.index',[
            'brackets' => $brackets,
            'user' => $user,
        ]);
    }

    public function showCreateBracket(Request $request)
    {
        $bracket = Bracket::where('master',true)->first();
        $deps = $this->getBracketDependencies($bracket);
        $deps['master'] = false;
        $deps['game_container'] = 'brackets.game_buttons';
        $deps['bracket_link'] = url('/brackets/new');
        $deps['back_link'] = url('/brackets');
        return view('brackets.bracket_display',$deps);
    }

    public function viewBracket(Request $request, Bracket $bracket)
    {
        $deps = $this->getBracketDependencies($bracket);
        $deps['master'] = false;
        $deps['user'] = $bracket->user;
        if (Tournament::where('active',1)->first()->state == 'submission') {
            $deps['game_container'] = 'brackets.game_buttons';
        } else {
            $deps['game_container'] = 'brackets.game_labels';
        }
        $deps['bracket_link'] = url('/brackets/'.$bracket->bracket_id);
        $deps['back_link'] = url('/brackets');
        return view('brackets.bracket_display',$deps);
    }

    public function createBracket(Request $request)
    {

        $this->dispatch(new ValidateBracket($request,
            new ValidateUserCreateBracketStrategy($this->teamRepo),
            new CreateBaseBracketStrategy($this->teamRepo)));

        $alert = [
            'message' => 'Bracket Processing',
            'level' => 'warning'
        ];

        $request->session()->put('alert', $alert);
        return redirect('/brackets');
    }

    public function updateBracket(Request $request, Bracket $bracket)
    {
        $this->dispatch(new ValidateBracket($request,
            new ValidateUserUpdateBracketStrategy($this->teamRepo),
            new UpdateBaseBracketStrategy($this->teamRepo, $bracket)));

        $alert = [
            'message' => 'Bracket Update Processing',
            'level' => 'warning'
        ];

        $request->session()->put('alert', $alert);
        return redirect('/brackets');

    }

    public function destroyBracket(Request $request, Bracket $bracket)
    {
        if($bracket->user_id != Auth::user()->user_id) {
            $alert = [
                'message' => 'Can\'t delete someone elses bracket',
                'level' => 'danger'
            ];
        } else {
            $alert = $this->commitDeleteBracket($bracket);
        }
        $request->session()->put('alert', $alert);

        return redirect('/brackets');
    }

    /**
     * ADMIN BRACKET SECTION
     */

    /**
     * display form for creating a bracket for a user
     *
     */
    public function showCreateBracketAdmin(Request $request)
    {
        $users = User::select('name','user_id')->get();
        JavaScript::put([
            'users' => $users,
        ]);
        $bracket = Bracket::where('master',true)->first();
        $deps = $this->getBracketDependencies($bracket);
        $deps['users'] = $users;
        $deps['master'] = false;
        $deps['game_container'] = 'brackets.game_buttons';
        $deps['bracket_link'] = url('/admin/brackets/new');
        $deps['back_link'] = url('/admin/brackets');
        return view('brackets.bracket_display',$deps);
    }

    public function viewBracketAdmin(Request $request, Bracket $bracket)
    {
        $deps = $this->getBracketDependencies($bracket);
        $deps['master'] = false;
        $deps['user'] = $bracket->user;
        $deps['game_container'] = 'brackets.game_buttons';
        $deps['bracket_link'] = url('/admin/brackets/'.$bracket->bracket_id);
        $deps['back_link'] = url('/admin/brackets');
        return view('brackets.bracket_display',$deps);
    }

    /**
     * validate submitted bracket conforms to rules and
     * create, on success redirect back to bracket list,
     * on error return to bracket creation screen with errors
     * and inputs
     *
     */
    public function createBracketAdmin(Request $request)
    {
        $this->dispatch(new ValidateBracket($request,
            new ValidateAdminCreateBracketStrategy($this->teamRepo),
            new CreateBaseBracketStrategy($this->teamRepo)));


        $alert = [
            'message' => 'Bracket Processing',
            'level' => 'warning'
        ];

        $request->session()->put('alert', $alert);
        return redirect()->action('AdminController@bracketsIndex');
    }

    public function updateBracketAdmin(Request $request, Bracket $bracket)
    {
        $this->dispatch(new ValidateBracket($request,
            new ValidateAdminUpdateBracketStrategy($this->teamRepo),
            new UpdateBaseBracketStrategy($this->teamRepo,$bracket)));

        $alert = [
            'message' => 'Bracket Update Processing',
            'level' => 'warning'
        ];

        $request->session()->put('alert', $alert);
        return redirect('/admin/brackets');
    }

    public function destroyBracketAdmin(Request $request, Bracket $bracket)
    {
        $alert = $this->commitDeleteBracket($bracket);
        $request->session()->put('alert', $alert);

        return redirect()->action('AdminController@bracketsIndex');
    }

    /**
     * BRACKET HELPER FUNCTIONS
     */

    private function getBracketDependencies($bracket=NULL)
    {
        if(isset($bracket)) {
            $games = BracketFactory::reverseBracket($bracket,new ReverseBaseBracketStrategy());
        }
        $regions = Region::where('region','<>','')->get();
        $rounds = count($games);
        return [
            'teamRepo' => $this->teamRepo,
            'bracket' => $bracket,
            'games' => $games,
            'regions' => $regions
        ];
    }


    private function commitDeleteBracket(Bracket $bracket)
    {
        $name = $bracket->name;
        $bracket->delete();

        $alert = [
            'message' => 'Bracket ('.$name.') deleted',
            'level' => 'warning'
        ];
        return $alert;
    }

}