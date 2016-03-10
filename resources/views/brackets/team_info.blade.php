<div class='hide'>
@foreach($games as $round=>$round_games)
{{--*/ $round_games = games->get(1)/*--}}
{{--*/ $game_num = 1 /*--}}
@foreach($round_games as $game)
                <p id="{{ $teamRepo->byTeamId($game->team_a)->name }}" data-bg="{{ $team_a->primary_color }}" data-fg="{{ $team_a->accent_color }}" >
                <p id="{{ $teamRepo->byTeamId($game->team_b)->name }}" data-bg="{{ $team_b->primary_color }}" data-fg="{{ $team_b->accent_color }}" >
    {{--*/ $game_num++ /*--}}
@endforeach
@endforeach
</div>
