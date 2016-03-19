@extends('layouts.app')

@section('content')
    <div class="container">
        <!-- Display Validation Errors -->
@include('common.alerts')
@include('common.errors')
        <div class="panel-body">
@if ($tourney_state->name == 'setup')
            <div class="jumbotron">
                <h2>You're Early!</h2>
                <p>
                    Bracket submission is not open yet, because the master bracket
                    has not been submitted yet. If you think there may be a problem
                    please contact the tournament administrator directly or use the
                    <a href="{{ url('/feedback') }}">Feedback</a> link. Otherwise
                    just wait it out, we're excited too...
                </p>
                <div class="row">
                    <div class="btn-group">
@include('common.back_button',[ 'back_link'=>url('/home')])
                    </div>
                </div>
            </div>
@else {{-- tourney state != 'setup' --}}
            <div>
@if ($tourney_state->name == 'submission')
                <div class="pull-right">
                    <a class="btn btn-success" href="{{ url('/brackets/new') }}">
                        <i class="fa fa-btn fa-plus"></i> Create Bracket
                    </a>
                </div>
@endif
@include('common.back_button',[ 'back_link'=>url('/home')])
            </div>
            <br>
            <br>
@if (count($brackets) > 0 || count($tasks) > 0)
@if (count($brackets) > 0)
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>Your Brackets</h4>
                </div>

                <div class="panel-body">
                    <table class="table table-striped">

                        <!-- Table Headings -->
                        <thead>
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
                                    <div>{{ $bracket->name }}</div>
                                </td>
                                <td class="table-text" >
                                    <span class="text-center team-name" style="background-color: #{{ $bracket->root->victor->primary_color }}; color: #{{ $bracket->root->victor->accent_color }};">
                                        {{ $bracket->root->victor->name }}
                                    </span>
                                </td>
                                <td>
                                    <div class="btn-group" role="group">
@include('brackets.list_item')
                                    </div>
                                </td>
                            </tr>
@endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            <br>
            <br>
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
@else
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>You Have No Saved Brackets</h4>
                </div>
            </div>
@endif
@endif
        </div>
    </div>

@endsection
