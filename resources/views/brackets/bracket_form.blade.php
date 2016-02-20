                {!! csrf_field() !!}
                <div class="row">
                <!-- Bracket Name -->
                    <div class="col-sm-6">
                        <div class="form-group @if ($errors->has('name')) has-error @endif">
                            <label for="bracket-name" class="col-sm-3 control-label">Bracket Name</label>
                            <input type="text" name="name" placeholder="Bracket Name" id="bracket-name" class="form-control" value="{{ (!empty(old('name'))||!isset($bracket))?old('name'):(($master)?$bracket->name:(Auth::user()->name.'\'s Bracket')) }}">
                        </div>
                    </div>
@if( Auth::user()->hasRole('admin') && isset($users) )
    {{-- if admin allow setting of user for user brackets --}}
                    <div class="col-md-6">
                        <div class="form-group @if ($errors->has('user_id')) has-error @endif">
                            <label for="bracket-owner" class="col-sm-3 control-label">Bracket Owner</label>
                            <input type="text" name="user_id" placeholder="Jake" id="bracket-owner" class="form-control" value="{{ (!empty(old('user_id'))||!isset($user))?old('user_id'):$user->name }}">
                        </div>
                    </div>
@push('styles')
    <link href="{{ elixir('css/typeahead-bootstrap.css') }}" rel="stylesheet">
@endpush
@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.jquery.min.js"></script>
    <script src="{{ elixir('js/user_search.js') }}"></script>
    <script>
    var users =
    [
@foreach($users as $user)
        {
            'name': "{{ $user->name }}",
            'id': "{{ $user->user_id }}"
        },
@endforeach
    ];
    </script>
@endpush

@else
                            <input type="hide" name="user_id" id="bracket-owner" class="hide" value="{{ (!empty(old('name'))||!isset($bracket))?old('name'):$bracket->name }}">
@endif
                </div>

                <!-- Hidden fields for each game -->
@foreach($games as $round=>$round_games)
{{--*/ $game_num = 1 /*--}}
@foreach($round_games as $game)
                <input class="hide" type="hidden" id="{{ 'R'.$round.'G'.$game_num.'T1' }}"
                        name="{{ 'R'.$round.'G'.$game_num.'T1' }}" value="{{ $teamRepo->byTeamId($game->team_a)->name }}" >
                <input class="hide" type="hidden" id="{{ 'R'.$round.'G'.$game_num.'T2' }}"
                        name="{{ 'R'.$round.'G'.$game_num.'T2' }}" value="{{ $teamRepo->byTeamId($game->team_b)->name }}" >
                <input class="hide" type="hidden" id="{{ 'R'.$round.'G'.$game_num.'W'  }}"
                        name="{{ 'R'.$round.'G'.$game_num.'W'  }}" value="{{ $teamRepo->byTeamId($game->winner)->name }}" >
    {{--*/ $game_num++ /*--}}
@endforeach
@endforeach

@push('scripts')
    <script src="{{ elixir('js/bracket_select.js') }}"></script>
@endpush


