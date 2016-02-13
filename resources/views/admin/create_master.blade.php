@extends('layouts.app')
@push('styles')
    <link href="{{ elixir('css/typeahead-bootstrap.css') }}" rel="stylesheet">
@endpush

@section('content')
    <div class="container">
       <div class="panel-body">
            <!-- Display Validation Errors And Alerts -->
@include('common.alerts')
@include('common.errors')
            <!-- Master Bracket Create Form -->
            <form action="{{ url('admin/bracket') }}" method="POST">
                {!! csrf_field() !!}
                <!-- Submit Button -->
                <div class="pull-left">
                    <a class="btn btn-primary" href="{{ url('/admin') }}">
                        <i class="fa fa-btn fa-arrow-left"></i> Back
                    </a>
                </div>
                <div class="row">
                    <div class="form-group btn-group pull-right">
                        <p class="btn btn-danger" id="start-madness">
                            <i class="fa fa-btn fa-warning"></i> Start
                        </p>
                        <input type="text" name="start-madness" value="false" class="hide" id="madness-flag" >
                        <button type="submit" class="btn btn-success" id="save-button">
                            <i class="fa fa-btn fa-save"></i> Save
                        </button>
                    </div>
                </div>
                <div class="row master-bracket">
@foreach ($regions as $region)
                    <div class="col-md-2 col-md-offset-1">
                        <h3>{{ $region->region }}</h3>
@for ($team = 1; $team <= $region_size/2; $team++)
        {{--*/ $firstid='region-'.$region->region.'-rank-'.$team /*--}}
        {{--*/ $secondid='region-'.$region->region.'-rank-'.($region_size+1-$team) /*--}}
                        <div class="form-group">
                            <label for="{{ $firstid }}" class="control-label master-label text-center @if ($errors->has($firstid)) has-error @endif">
@if (!empty(old($firstid)))
                                {{old($firstid)}}
@elseif (
@else
                                {{'Team '.$team}}
@endif
                            </label>
                            <input type="text" name="{{ $firstid }}" id="{{ $firstid }}" class="form-control master-input hide" value="{{ old($firstid) }}">
                            <br>
                            <label for="{{ $secondid }}" class="control-label master-label text-center @if ($errors->has($secondid)) has-error @endif">
@if (empty(old($secondid)))
                                {{'Team '.($region_size+1-$team)}}
@else
                                {{old($secondid)}}
@endif
                            </label>
                            <input type="text" name="{{ $secondid }}" id="{{ $secondid }}" class="form-control master-input hide" value="{{ old($secondid) }}">
                        </div>
@endfor {{-- rows --}}
                    </div>
@endforeach {{-- columns --}}
                </div>
            </form>
        </div>
    </div>
@endsection
@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.jquery.min.js"></script>
    <script>
    var teams =
    [
@foreach($teams as $team)
        {
        'name': "{{ $team->name }}",
        'id': "{{ $team->team_id }}"
        },
@endforeach
    ];
    </script>
    <script src="{{ elixir('js/master_bracket.js') }}"></script>
@endpush
