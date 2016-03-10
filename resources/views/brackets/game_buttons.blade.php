<div class="bracket-game">
    {{-- $team_a = $teamRepo->byName(!empty(old('games.'.$game->round_id.'.'.$game_num.'.T1'))?old('games.'.$game->round_id.'.'.$game_num.'.T1'):$teamRepo->byTeamId($game->team_a)->name) --}}
    {{-- $team_a = !empty(old('games.'.$game->round_id.'.'.$game_num.'.T2'))?$teamRepo->byName(old('games.'.$game->round_id.'.'.$game_num.'.T2')):$teamRepo->byTeamId($game->team_b) --}}
    {{--*/ $team_a = !empty(old('games.'.$game->round_id.'.'.$game_num.'.T2'))?$teamRepo->byName(old('games.'.$game->round_id.'.'.$game_num.'.T2')):$teamRepo->byTeamId($game->team_b) /*--}}
    {{--*/ $team_b = !empty(old('games.'.$game->round_id.'.'.$game_num.'.T2'))?$teamRepo->byName(old('games.'.$game->round_id.'.'.$game_num.'.T2')):$teamRepo->byTeamId($game->team_b) /*--}}
    <button class="btn btn-team" id="R{{ $game->round_id }}G{{ $game_num }}T1B" style="background-color: #{{ $team_a->primary_color }}; color: #{{ $team_a->accent_color }};">
        <span class="pull-left team-rank">#{{ $team_a->rank }}</span>
        <span class="team-name">{{ $team_a->name }}</span>
    </button>
    <button class="btn btn-team" id="R{{ $game->round_id }}G{{ $game_num }}T2B" style="background-color: #{{ $team_b->primary_color }}; color: #{{ $team_b->accent_color }};">
        <span class="pull-left team-rank">#{{ $team_b->rank }}</span>
        <span class="team-name">{{ $team_b->name }}</span>
    </button>
</div>
