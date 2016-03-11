                {!! csrf_field() !!}
                <div class="row">
                <!-- Bracket Name -->
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="bracket-name" class="col-sm-3 control-label">Bracket Name</label>
                            <input type="text" name="name" placeholder="Bracket Name" id="bracket-name" class="form-control"
                            value="{{ (!empty(old('name'))||!isset($bracket))?old('name'):(($master)?$bracket->name:(Auth::user()->name.'\'s Bracket')) }}">
                        </div>
                    </div>
@if( Auth::user()->hasRole('admin') && !isset($user) && isset($users) )
    {{-- if admin allow setting of user for user brackets --}}
                    <div class="col-md-6">
                        <div class="form-group @if ($errors->has('user_id')) has-error @endif">
                            <input type="hidden" class="hide" name="user_id" id="bracket-owner-real" value="{{ (!empty(old('user_id')))?old('user_id'):Auth::user()->user_id }}">
                            <label for="bracket-owner" class="col-sm-3 control-label">Bracket Owner</label>
                            <input type="text" placeholder="Jake" id="bracket-owner" class="form-control" >
                        </div>
                    </div>
@push('styles')
    <link href="{{ elixir('css/typeahead-bootstrap.css') }}" rel="stylesheet">
@endpush
@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.jquery.min.js"></script>
    {{--<script src="{{ elixir('js/typeahead.js') }}"></script>--}}
    <script src="{{ elixir('js/user_search.js') }}"></script>
@endpush

@elseif (isset($user))
                    <input type="hidden" name="user_id" id="bracket-owner" class="hide" value="{{ $user->user_id }}">
@else
                    <input type="hidden" name="user_id" id="bracket-owner" class="hide" value="{{ Auth::user()->user_id }}">
@endif
@if(Request::is('*brackets/new'))
                    <input type="hidden" name="bracket_id" id="bracket-id" class="hide" value="">
@else 
                    <input type="hidden" name="bracket_id" id="bracket-id" class="hide" value="{{  $bracket->bracket_id  }}">
@endif
                </div>

                <!-- Hidden fields for each game -->
                <div class='hide'>
@foreach($games as $round=>$round_games)
{{--*/ $game_num = 1 /*--}}
@foreach($round_games as $game)
    {{--*/ $gn = 'games['.$round.']['.$game_num.']' /*--}}
    {{--*/ $gi = 'R'.$round.'G'.$game_num /*--}}
    {{--*/ $gv = 'games.'.$round.'.'.$game_num.'.' /*--}}

                <input type="text" id="{{ $gi.'T1' }}" name="{{ $gn.'[T1]' }}" value="{{ !empty(old($gv.'T1'))?old($gv.'T1'):$teamRepo->byTeamId($game->team_a)->name }}">
                <input type="text" id="{{ $gi.'T2' }}" name="{{ $gn.'[T2]' }}" value="{{ !empty(old($gv.'T2'))?old($gv.'T2'):$teamRepo->byTeamId($game->team_b)->name }}">
                <input type="text" id="{{ $gi.'W' }}" name="{{ $gn.'[W]' }}" value="{{ !empty(old($gv.'W'))?old($gv.'W'):$teamRepo->byTeamId($game->winner)->name }}">
    {{--*/ $game_num++ /*--}}
@endforeach
@endforeach
</div>

@push('scripts')
    <script src="{{ elixir('js/bracket_select.js') }}"></script>
@endpush


