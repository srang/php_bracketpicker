<?php

namespace App\Http\Controllers;

use App\Bracket;
use App\Region;
use App\Team;
use App\Repositories\TeamRepository;
use App\Factories\BracketFactory;
use App\Strategies\CreateBaseBracketStrategy;
use App\Strategies\ReverseBaseBracketStrategy;
use App\Strategies\ValidateBaseBracketStrategy;
use App\Strategies\ValidateUserUpdateBracketStrategy;
use App\Strategies\ValidateUserCreateBracketStrategy;

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
        $games = BracketFactory::reverseBracket($bracket,new ReverseBaseBracketStrategy());
        $regions = Region::where('region','<>','')->get();
        $rounds = count($games);
        return view('brackets.bracket_display',[
            'teamRepo' => $this->teamRepo,
            'bracket' => $bracket,
            'master' => false,
            'games' => $games,
            'regions' => $regions,
            'game_container' => 'brackets.game_buttons',
            'bracket_link' => url('/brackets/new'),
            'back_link' => url('/brackets')
        ]);
    }

    public function viewBracket(Request $request, Bracket $bracket)
    {
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
            'bracket_link' => url('/brackets/'.$bracket->bracket_id),
            'back_link' => url('/brackets')
        ]);
    }

    public function createBracket(Request $request)
    {
        $errors = BracketFactory::validateBracket($request,new ValidateUserCreateBracketStrategy($this->teamRepo));
        if ($errors->count() > 0) {
            return redirect('/brackets/new')->withInput()->withErrors($errors);
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
                'message' => 'Save successful.',
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
        return redirect('/brackets');
    }

    public function updateBracket(Request $request, Bracket $bracket)
    {
        $errors = BracketFactory::validateBracket($request,new ValidateUserUpdateBracketStrategy($this->teamRepo));
        if ($errors->count() > 0) {
            return redirect('/brackets/'.$bracktet->bracket_id)->withInput()->withErrors($errors);
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
                'message' => 'Save successful.',
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
            $name = $bracket->name;
            $bracket->delete();

            $alert = [
                'message' => 'bracket ('.$name.') deleted',
                'level' => 'warning'
            ];
        }
        $request->session()->put('alert', $alert);

        return redirect('/brackets');
    }

}
