@extends('layouts.app')

@section('content')
    <div class="container">
       <div class="panel-body">
            <!-- Display Validation Errors -->
@include('common.errors')
            <!-- New Team Form -->
            <form action="{{ url('admin/team') }}" method="POST">
                {!! csrf_field() !!}

                <div class="row">
                <!-- Team Name -->
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="team-name" class="col-sm-3 control-label">Team</label>
                            <input type="text" name="name" id="team-name" class="form-control">
                        </div>
                    </div>

                    <!-- Team Mascot -->
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="team-mascot" class="col-sm-3 control-label">Mascot</label>
                            <input type="text" name="name" id="team-name" class="form-control">
                        </div>
                    </div>
                </div>

                <!-- Colors -->
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                            <label for="primary" class="col-sm-3 control-label">Primary Color</label>
                            <input type="text" name="primary_color" id="primary" class="form-control">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6">
                            <label for="secondary" class="col-sm-3 control-label">Accent Color</label>
                            <input type="text" name="accent_color" id="secondary" class="form-control">
                        </div>
                    </div>
                </div>


                <!-- Add Team Button -->
                <div class="form-group">
                    <div class="pull-right">
                        <button type="submit" class="btn btn-default">
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

                            <td>
                                <form action="{{ url('team/'.$team->team_id) }}" method="POST">
                                    {!! csrf_field() !!}
                                    {!! method_field('DELETE') !!}

                                    <button>Delete Team</button>
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
