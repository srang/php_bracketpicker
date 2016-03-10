<div class='hide'>
{{--*/ $round_games = $games[1]/*--}}
{{--*/ $game_num = 1 /*--}}
@foreach($round_games as $game)
    {{--*/ $team_a = $teamRepo->byTeamId($game->team_a) /*--}}
    {{--*/ $team_b = $teamRepo->byTeamId($game->team_b) /*--}}
                <p id="{{ $team_a->name }}" data-bg="#{{ $team_a->primary_color }}" data-fg="#{{ $team_a->accent_color }}" >
                <p id="{{ $team_b->name }}" data-bg="#{{ $team_b->primary_color }}" data-fg="#{{ $team_b->accent_color }}" >
    {{--*/ $game_num++ /*--}}
@endforeach
</div>
