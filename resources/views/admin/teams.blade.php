@extends('layouts.app')

@section('content')
    <div class="container">
       <div class="panel-body">
            <!-- Display Validation Errors -->
@include('common.errors')
@include('common.alerts')
            <!-- New Team Form -->
            <form action="{{ url('admin/team') }}" method="POST">
@include('admin.team_form')
                <!-- Add Team Button -->
@include('common.back_button',[ 'back_link'=>url('admin')])
                <div class="form-group">
                    <div class="pull-right">
                        <button type="submit" class="btn btn-success">
                            <i class="fa fa-btn fa-plus"></i> Add Team
                        </button>
                    </div>
                </div>
            </form>
        </div>

@if (count($teams) > 0)
        <div class="panel panel-default">
            <div class="panel-heading">
                Teams
            </div>

            <div class="panel-body">
                <table class="table table-striped">

                    <!-- Table Headings -->
                    <thead>
                        <th>Team</th>
                        <th>Mascot</th>
                        <th>Region</th>
                        <th>Rank</th>
                        <th>Colors</th>
                        <th>&nbsp;</th>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
@foreach ($teams as $team)
                        <tr>
                            <!-- Team Name -->
                            <td class="table-text">
                                <div>{{ $team->name }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $team->mascot }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $team->region->region }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $team->rank }}</div>
                            </td>
                            <td class="table-text" >
                                <span class="text-center team-name" style="background-color: #{{ $team->primary_color }}; color: #{{ $team->accent_color }};">
                                    {{ $team->name }}
                                </span>
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <form action="{{ url('admin/team/'.$team->team_id) }}" method="POST">
                                        {!! csrf_field() !!}
                                        {!! method_field('DELETE') !!}
                                        <button type="submit" class="btn btn-danger">
                                            <i class="fa fa-btn fa-trash"></i> Delete
                                        </button>
                                        <a class="btn btn-info" href="{{ url('admin/team/'.$team->team_id) }}">
                                            <i class="fa fa-btn fa-pencil"></i> Edit
                                        </a>
                                    </form>
                                    <form action="{{ url('admin/team/'.$team->team_id) }}" method="POST">
                                        {!! csrf_field() !!}
                                        {!! method_field('PUT') !!}
                                        <input type="hidden" name="name" value="{{ $team->name }}">
                                        <input type="hidden" name="mascot" value="{{ $team->mascot }}">
                                        <input type="hidden" name="rank" value="{{ $team->rank }}">
                                        <input type="hidden" name="region" value="{{ $team->region->region }}">
                                        <input type="hidden" name="primary_color" value="{{ $team->accent_color }}">
                                        <input type="hidden" class="btn" name="accent_color" value="{{ $team->primary_color }}">
                                        <button type="submit" class="btn btn-primary">
                                            <i class="fa fa-btn fa-refresh"></i> Swap Colors
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
@endforeach
                    </tbody>
                </table>
            </div>
        </div>
@endif
    </div>

@endsection

@push('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.11.1/typeahead.jquery.min.js"></script>
@endpush
