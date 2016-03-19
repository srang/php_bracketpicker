<div class="bracket-game">
    {{--*/ $team_a = $teamRepo->byTeamId($game->team_a) /*--}}
    {{--*/ $team_b = $teamRepo->byTeamId($game->team_b) /*--}}
    <p class="game-label team-name" style="background-color: #{{ $team_a->primary_color }}; color: #{{ $team_a->accent_color }};">
        <span class="team-rank">#{{ $team_a->rank }}</span>
        <span class="team-name">{{ $team_a->name }}</span>
    </p>
    <p class="game-label team-name" style="background-color: #{{ $team_b->primary_color }}; color: #{{ $team_b->accent_color }};">
        <span class="team-rank">#{{ $team_b->rank }}</span>
        <span class="team-name">{{ $team_b->name }}</span>
    </label>
</div>
