@extends('layouts.app')

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
                    <a class="btn btn-primary">
                        <i class="fa fa-btn fa-save"></i> Back
                    </a>
                </div>
                <div class="row">
                    <input class="typeahead" type="text" placeholder="States of USA">
                    <div class="form-group">
                        <div class="pull-right">
                            <button type="submit" class="btn btn-success">
                                <i class="fa fa-btn fa-save"></i> Save
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row master-bracket">
@for ($region = 1; $region <= $regions->count(); $region++)
                    <h3>{{ $regions->pop() }}</h3>
                    <div class="col-md-2 col-md-offset-1">
@for ($team = 1; $team <= $region_size/2; $team++)
                        <div class="form-group">
                            <label for="{{ 'region-'.$region.'-team-'.$team }}" class="control-label text-center @if ($errors->has('region-'.$region.'-team-'.$team)) has-error @endif">
@if (!empty(old('region-'.$region.'-team-'.$team)))
                                {{old('region-'.$region.'-team-'.$team)}}
@else
                                {{'Team '.$team}}
@endif
                            </label>
                            <input type="text" name="{{ 'region-'.$region.'-team-'.$team }}" id="{{ 'region-'.$region.'-team-'.$team }}" class="form-control hide" value="{{ old('region-'.$region.'-team-'.$team) }}">
                            <br>
                            <label for="{{ 'region-'.$region.'-team-'.($region_size+1-$team) }}" class="control-label text-center @if ($errors->has('region-'.$region.'-team-'.($region_size+1-$team))) has-error @endif">
@if (empty(old('region-'.$region.'-team-'.($region_size+1-$team))))
                                {{'Team '.($region_size+1-$team)}}
@else
                                {{old('region-'.$region.'-team-'.($region_size+1-$team))}}
@endif
                            </label>
                            <input type="text" name="{{ 'region-'.$region.'-team-'.($region_size+1-$team) }}" id="{{ 'region-'.$region.'-team-'.($region_size+1-$team) }}" class="form-control hide" value="{{ old('region-'.$region.'-team-'.($region_size+1-$team)) }}">
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
