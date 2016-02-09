@extends('layouts.app')

@section('content')
    <div class="container">
       <div class="panel-body">
            <!-- Display Validation Errors -->
@include('common.alerts')
@include('common.errors')
            <!-- New Team Form -->
            <form action="{{ url('admin/team') }}" method="POST">
@include('common.team_form')
                <!-- Add Team Button -->
                <div class="form-group">
                    <div class="pull-right">
                        <button type="submit" class="btn btn-success">
                            <i class="fa fa-plus"></i> Add Team
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
                        <th>Masct</th>
                        <th>Primary Color</th>
                        <th>Accent Color</th>
                        <th>Icon Path</th>
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
                                <div>{{ $team->primary_color }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $team->accent_color }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $team->icon_path }}</div>
                            </td>

                            <td>
                                <form action="{{ url('admin/team/'.$team->team_id) }}" method="POST">
                                    {!! csrf_field() !!}
                                    {!! method_field('DELETE') !!}

                                    <div class="btn-group">
                                    <button type="submit" class="btn btn-danger">
                                        <i class="fa fa-trash"></i> Delete Team
                                    </button>
                                    <a class="btn btn-info" href="{{ url('admin/team/'.$team->team_id) }}">
                                        <i class="fa fa-pencil"></i> Edit Team
                                    </a>
                                </form>
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
