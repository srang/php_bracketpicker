                {!! csrf_field() !!}
                <div class="row">
                <!-- Bracket Name -->
                    <div class="col-sm-6">
                        <div class="form-group @if ($errors->has('name')) has-error @endif">
                            <label for="team-name" class="col-sm-3 control-label">Team</label>
                            <input type="text" name="name" placeholder="Bracket Name" id="team-name" class="form-control" value="{{ old('name') }}">
                        </div>
                    </div>
                </div>

                <!-- Hidden fields for each game -->
@foreach($games as $round=>$round_games)
{{--*/ $game_num = 1 /*--}}
@foreach($round_games as $game)
                <input class="hide" type="hidden" id="{{ 'R'.$round.'G'.$game_num.'T1' }}" value="{{ $teamRepo->byTeamId($game->team_a)->name }}" >
                <input class="hide" type="hidden" id="{{ 'R'.$round.'G'.$game_num.'T2' }}" value="{{ $teamRepo->byTeamId($game->team_b)->name }}" >
                <input class="hide" type="hidden" id="{{ 'R'.$round.'G'.$game_num.'W' }}"  value="{{ $teamRepo->byTeamId($game->winner)->name }}" >
    {{--*/ $game_num++ /*--}}
@endforeach
@endforeach

@push('scripts')
    <script src="{{ elixir('js/bracket_select.js') }}"></script>
@endpush


