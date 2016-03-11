<div class='hide'>
{{--*/ $round_games = $games[1]/*--}}
{{--*/ $game_num = 1 /*--}}
@foreach($round_games as $game)
    {{--*/ $team_a = $teamRepo->byTeamId($game->team_a) /*--}}
    {{--*/ $team_b = $teamRepo->byTeamId($game->team_b) /*--}}
        <p id="{{ $team_a->encodeName() }}" data-name="{{ $team_a->name}}" data-rank="{{ $team_a->rank }}" data-bg="#{{ $team_a->primary_color }}" data-fg="#{{ $team_a->accent_color }}" >
        <p id="{{ $team_b->encodeName() }}" data-name="{{ $team_b->name}}" data-rank="{{ $team_b->rank }}" data-bg="#{{ $team_b->primary_color }}" data-fg="#{{ $team_b->accent_color }}" >
    {{--*/ $game_num++ /*--}}
@endforeach
        <p id="tbd" data-name="TBD" data-rank="" data-bg="#AAA" data-fg="#000" >

</div>
