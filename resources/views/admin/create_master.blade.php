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
            <form action="{{ url('admin/brackets/master') }}" method="POST">
                {!! csrf_field() !!}
@include('common.back_button',['back_link'=>url('admin/brackets')])
                <!-- Submit Button -->
                <div class="row">
                    <div class="form-group btn-group pull-right">
                        <p class="btn btn-danger" id="start-madness" data-toggle="tooltip" data-placement="bottom" title="Save and Open Submissions">
                            <i class="fa fa-btn fa-warning"></i> Start
                        </p>
                        <input type="hidden" name="start_madness" value="false" id="madness-flag" >
                        <input type="hidden" name="name" value="Master Bracket" >
                        <button type="submit" class="btn btn-success" id="save-button" data-toggle="tooltip" data-placement="bottom" title="Save Master Bracket">
                            <i class="fa fa-btn fa-save"></i> Save
                        </button>
                    </div>
                </div>
                <div class="row master-bracket">
@foreach ($regions as $region)
                    <div class="col-md-3">
                        <h3 class="region-header">{{ $region->region }}</h3>
@foreach ($matchups as $first)
        {{--*/ $firstid='region-'.$region->region.'-rank-'.$first /*--}}
        {{--*/ $firstname='team['.$region->region.']['.$first.']' /*--}}
        {{--*/ $secondid='region-'.$region->region.'-rank-'.($region_size+1-$first) /*--}}
        {{--*/ $secondname='team['.$region->region.']['.($region_size+1-$first).']' /*--}}
                        <div class="form-group">
                            <div class="row">
                                <span class="rank-info text-right col-md-3">#{{ $first}} </span>
                                <div class="text-left col-md-9">
                                    <label for="{{ $firstid }}" class="control-label master-label @if ($errors->has($firstname)) has-error @endif">
@if (!empty($old_val=old($firstname)))
                                        {{ $old_val }}
                                    </label>
                                    <input type="text" name="{{ $firstname }}" id="{{ $firstid }}" class="form-control master-input hide" value="{{ $old_val }}">
@elseif (!empty($team=$teamRepo->byRankRegion($first,$region->region)))
                                        <span class="team-name" style="background-color: #{{ $team->primary_color }}; color: #{{ $team->accent_color }};">
                                            {{ $team->name }}
                                        </span>
                                    </label>
                                    <input type="text" name="{{ $firstname }}" id="{{ $firstid }}" class="form-control master-input hide" value="{{ $team->name }}">
@else
                                        <span class="placeholder">{{ 'Team '.$first }}</span>
                                    </label>
                                    <input type="text" name="{{ $firstname }}" id="{{ $firstid }}" class="form-control master-input hide" >
@endif
                                </div>
                            </div>
                            <div class="row">
                                <span class="rank-info text-right col-md-3">#{{ $region_size+1-$first }} </span>
                                <div class="text-left col-md-9">
                                    <label for="{{ $secondid }}" class="control-label master-label @if ($errors->has($secondname)) has-error @endif">
@if (!empty($old_val=old($secondname)))
                                        {{$old_val}}
                                    </label>
                                    <input type="text" name="{{ $secondname }}" id="{{ $secondid }}" class="form-control master-input hide" value="{{ $old_val }}">
@elseif (!empty($team=$teamRepo->byRankRegion(($region_size+1-$first),$region->region)))
                                        <span class="team-name" style="background-color: #{{ $team->primary_color }}; color: #{{ $team->accent_color }};">
                                            {{ $team->name }}
                                        </span>
                                    </label>
                                    <input type="text" name="{{ $secondname }}" id="{{ $secondid }}" class="form-control master-input hide" value="{{ $team->name }}">
@else
                                        <span class="placeholder">{{'Team '.($region_size+1-$first)}}</span>
                                    </label>
                                    <input type="text" name="{{ $secondname }}" id="{{ $secondid }}" class="form-control master-input hide" value="">
@endif
                                </div>
                            </div>
                        </div>
@endforeach {{-- rows --}}
                    </div>
@endforeach {{-- columns --}}
                </div>
            </form>
        </div>
    </div>
@endsection
@push('scripts')
    {{--<script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.jquery.min.js"></script>--}}
    <script src="{{ elixir('js/typeahead.js') }}"></script>
    <script src="{{ elixir('js/master_bracket.js') }}"></script>
@endpush
