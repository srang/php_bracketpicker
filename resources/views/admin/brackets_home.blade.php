@extends('layouts.app')

@section('content')
    <div class="container">
       <div class="panel-body">
            <!-- Display Validation Errors -->
@include('common.errors')
@include('common.alerts')
        </div>
        <div>
@include('common.back_button',[ 'back_link'=>url('admin')])
@if($tourney_state->name === 'submission')
            <div class="pull-right">
                <a class="btn btn-success" href="{{ url('admin/brackets/new') }}">
                    <i class="fa fa-btn fa-plus"></i> Create Bracket
                </a>
            </div>
@endif
        </div>
        <br>
        <br>
        <!-- Master Bracket -->
        <div class="panel panel-default">
@if ($tourney_state->name === 'submission')
            <div class="panel-heading">
                <h4>{{ $master->name }}</h4>
            </div>
            <div class="panel-body">
                <div class="col-md-4">
                    <p>Bracket Submission Open</p>
                </div>
                <div class="col-md-4">
                    <p>Created At: {{ date('F d   g:i', strtotime($master->created_at)) }}</p>
                </div>
                <div class="col-md-4">
                    <div class="btn-group pull-right">
                        <a class="btn btn-info" href="{{ url('admin/brackets/master') }}">
                            <i class="fa fa-btn fa-arrow-right"></i> Edit
                        </a>
                        <a class="btn btn-warning" href="{{ url('admin/brackets/start') }}">
                            <i class="fa fa-btn fa-warning"></i> Start Tournament
                        </a>
                    </div>
                </div>
            </div>

@elseif ($tourney_state->name === 'active')
            <div class="panel-heading">
                Master Bracket
            </div>
            <div class="panel-body">
                <div class="col-md-4">
                    <h4>Tournament Has Begun</h4>
                </div>
                <div class="col-md-4">
                    <p>Started At: {{ date('F d   g:i', strtotime($tourney->updated_at)) }}</p>
                </div>
                <div class="col-md-4">
                    <div class="btn-group pull-right">
                        <a class="btn btn-info" href="{{ url('admin/brackets/master') }}">
                            <i class="fa fa-btn fa-arrow-right"></i> Edit
                        </a>
                        <a class="btn btn-warning" href="#">
                            <i class="fa fa-btn fa-warning"></i> Start Tournament
                        </a>
                    </div>
                </div>
            </div>
@elseif ($tourney_state->name === 'setup')
            <div class="panel-heading">
                Master Bracket
            </div>
            <div class="panel-body">
                <div class="col-md-4">
                    <h4>Master Bracket Setup Required</h4>
                </div>
                <div class="col-md-4">
                    <h4>Not Created Yet</h4>
                </div>
                <div class="col-md-4">
                    <div class="btn-group pull-right">
                        <a class="btn btn-success" href="{{ url('admin/brackets/master') }}">
                            <i class="fa fa-btn fa-arrow-magic"></i> Create
                        </a>
                    </div>
                </div>
            </div>
@endif
        </div>

        <!-- User Brackets -->
@if ($brackets->count() > 0)
        <div class="panel panel-default">
            <div class="panel-heading">
                Brackets
            </div>

            <div class="panel-body">
                <table class="table table-striped">

                    <!-- Table Headings -->
                    <thead>
                        <th>User</th>
                        <th>Bracket Name</th>
                        <th>Winner</th>
                        <th>&nbsp;</th>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
@foreach ($brackets as $bracket)
                        <tr>
                            <!-- Bracket Info -->
                            <td class="table-text">
                                <div>{{ $bracket->user->name }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $bracket->name }}</div>
                            </td>
                            <td class="table-text" >
                                <span class="text-center team-name" style="background-color: #{{ $bracket->root->victor->primary_color }}; color: #{{ $bracket->root->victor->accent_color }};">
                                    {{ $bracket->root->victor->name }}
                                </span>
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <form action="{{ url('admin/brackets/'.$bracket->bracket_id) }}" method="POST">
                                        {!! csrf_field() !!}
                                        {!! method_field('DELETE') !!}
                                        <button type="submit" class="btn btn-danger">
                                            <i class="fa fa-btn fa-trash"></i> Delete
                                        </button>
                                        <a class="btn btn-info" href="{{ url('admin/brackets/'.$bracket->bracket_id) }}">
                                            <i class="fa fa-btn fa-pencil"></i> Edit
                                        </a>
                                        <a class="btn btn-primary" href="{{ url('admin/brackets/'.$bracket->bracket_id.'/print') }}" target="_blank">
                                            <i class="fa fa-btn fa-print"></i> Print
                                        </a>
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
@if ($tasks->count() > 0)
        <div class="panel panel-default">
            <div class="panel-heading">
                Pending Brackets
            </div>
            <div class="panel-body">
                <table class="table table-striped">

                    <!-- Table Headings -->
                    <thead>
                        <th>Pending Brackets</th>
                        <th>User</th>
                        <th>Creation Date</th>
                        <th>Status</th>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
@foreach ($tasks as $task)
                        <tr>
                            <!-- task Info -->
                            <td class="table-text">
                                <div>{{ $task->name }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $task->user->name }}</div>
                            </td>
                            <td class="table-text" >
                                <span class="text-center" >
                                    {{ $task->start }}
                                </span>
                            </td>
                            <td class="table-text">
                                <div>Processing</div>
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
