<div class="bracket-game">
    {{--*/ $team_a = $teamRepo->byTeamId($game->team_a) /*--}}
    {{--*/ $team_b = $teamRepo->byTeamId($game->team_b) /*--}}
    <label class="btn btn-team" id="R{{ $game->round_id }}G{{ $game_num }}T1B" style="background-color: #{{ $team_a->primary_color }}; color: #{{ $team_a->accent_color }};">
        <span class="pull-left team-rank">#{{ $team_a->rank }}</span>
        <span class="team-name">{{ $team_a->name }}</span>
    </label>
    <label class="btn btn-team" id="R{{ $game->round_id }}G{{ $game_num }}T2B" style="background-color: #{{ $team_b->primary_color }}; color: #{{ $team_b->accent_color }};">
        <span class="pull-left team-rank">#{{ $team_b->rank }}</span>
        <span class="team-name">{{ $team_b->name }}</span>
    </label>
</div>
