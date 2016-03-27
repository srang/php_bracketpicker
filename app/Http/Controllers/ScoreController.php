<?php

namespace App\Http\Controllers;

use App\Bracket;
use App\Ruleset;
use App\Jobs\ScoreBracket;
use App\Strategies\ScoreBaseRulesetStrategy;
use App\Factories\BracketFactory;
use App\Repositories\TeamRepository;

use Log;
use Auth;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ScoreController extends Controller
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
     * Display standings
     *
     * @param  Request  $request
     * @return Response
     */
    public function index(Request $request)
    {
        $master = Bracket::where('master',1)->first();
        $ruleset_id = Ruleset::where('name','Bull Moose')->first()->ruleset_id;
        $brackets = Bracket::where('master',0)->get();
        $game = $master->root;
        return view('scores.index',[
            'user' => Auth::user(),
            'gamer' => $game,
            'master' => $master,
            'brackets' => $brackets,
            'ruleset_id' => $ruleset_id
        ]);
    }

    public function scoreBracket(Request $request, Bracket $bracket)
    {
        $ruleset = Ruleset::where('name','Bull Moose')->first();
        $this->dispatch(new ScoreBracket(new ScoreBaseRulesetStrategy($this->teamRepo, $ruleset),$bracket));
        $alert = [
            'message' => 'Bracket Score Processing',
            'level' => 'warning'
        ];

        $request->session()->put('alert', $alert);
        return redirect('/admin/brackets');
    }

    public function scoreAllBrackets(Request $request)
    {
        $ruleset = Ruleset::where('name','Bull Moose')->first();
        $brackets = Bracket::where('master',0)->get();
        foreach($brackets as $bracket) {
            $this->dispatch(new ScoreBracket(new ScoreBaseRulesetStrategy($this->teamRepo, $ruleset),$bracket));
        }
        $alert = [
            'message' => 'Created '.$brackets->count().' score jobs',
            'level' => 'warning'
        ];

        $request->session()->put('alert', $alert);
        return redirect('/admin/brackets');
    }
}
