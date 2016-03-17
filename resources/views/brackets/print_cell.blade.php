    {{--*/ $team = $teamRepo->byTeamId($team_id) /*--}}
<span class="rank">{{ $team->rank.'. ' }}</span><span class="team">{{ $team->name }}</span>
