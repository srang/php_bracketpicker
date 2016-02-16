@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="panel panel-default">
            <div class="panel-heading">
                Teams
            </div>

            <div class="panel-body">
                <table class="table table-striped">

                    <!-- Table Headings -->
                    <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Brackets</th>
                        <th>&nbsp;</th>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
                        <tr>
                            <!-- Team Name -->
                            <td class="table-text">
                                <div>{{ $master->name }}</div>
                            </td>
                            <td class="table-text">
                                <div>Master_bracket_first_game</div>
                            </td>
                            <td class="table-text">
                                <div>Master bracket info</div>
                            </td>
                            <td class="table-text">
                                <div>Info on master bracket</div>
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button class="btn btn-danger">
                                        <i class="fa fa-btn fa-trash"></i> Delete
                                    </button>
                                    <a class="btn btn-info" href="#">
                                        <i class="fa fa-btn fa-pencil"></i> Edit
                                    </a>
                                    <button class="btn btn-primary">
                                        <i class="fa fa-btn fa-warning"></i> Disable
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="row">
            <div class="pull-left">
                <a class="btn btn-primary" href="{{ url('/admin') }}">
                    <i class="fa fa-btn fa-arrow-left"></i> Back
                </a>
            </div>
        </div>
    </div>

@endsection
