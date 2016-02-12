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
@for ($region = 1; $region <= $regions->count(); $region++)
                    <div class="col-md-2 col-md-offset-1">
                        <h3>{{ $regions->get($region-1)['region'] }}</h3>
@for ($team = 1; $team <= $region_size/2; $team++)
                        <div class="form-group">
                            <label for="{{ 'region-'.$region.'-team-'.$team }}" class="control-label master-label text-center @if ($errors->has('region-'.$region.'-team-'.$team)) has-error @endif">
@if (!empty(old('region-'.$region.'-team-'.$team)))
                                {{old('region-'.$region.'-team-'.$team)}}
@else
                                {{'Team '.$team}}
@endif
                            </label>
                            <input type="text" name="{{ 'region-'.$region.'-team-'.$team }}" id="{{ 'region-'.$region.'-team-'.$team }}" class="form-control master-input hide" value="{{ old('region-'.$region.'-team-'.$team) }}">
                            <br>
                            <label for="{{ 'region-'.$region.'-team-'.($region_size+1-$team) }}" class="control-label master-label text-center @if ($errors->has('region-'.$region.'-team-'.($region_size+1-$team))) has-error @endif">
@if (empty(old('region-'.$region.'-team-'.($region_size+1-$team))))
                                {{'Team '.($region_size+1-$team)}}
@else
                                {{old('region-'.$region.'-team-'.($region_size+1-$team))}}
@endif
                            </label>
                            <input type="text" name="{{ 'region-'.$region.'-team-'.($region_size+1-$team) }}" id="{{ 'region-'.$region.'-team-'.($region_size+1-$team) }}" class="form-control master-input hide" value="{{ old('region-'.$region.'-team-'.($region_size+1-$team)) }}">
                        </div>
@endfor {{-- rows --}}
                    </div>
@endfor {{-- columns --}}
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
