@extends('layouts.app')

@section('content')
    <div class="container">
            
@if (count($users) > 0)
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
@foreach ($users as $user)
                        <tr>
                            <!-- Team Name -->
                            <td class="table-text">
                                <div>{{ $user->name }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $user->email }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $user->status->status }}</div>
                            </td>
                            <td class="table-text">
                                <div>{{ $user->brackets->count() }}</div>
                            </td>
                            <td>
                                <div class="btn-group" role="group">
                                    <button class="btn btn-danger">
                                        <i class="fa fa-btn fa-trash"></i> Delete
                                    </button>
                                    <a class="btn btn-info" href="#">
                                        <i class="fa fa-btn fa-pencil"></i> Edit
                                    </a>
                                    <button class="btn btn-warning">
                                        <i class="fa fa-btn fa-ban"></i> Disable
                                    </button>
                                </div>
                            </td>
                        </tr>
@endforeach
                    </tbody>
                </table>
            </div>
        </div>
@endif
        <div class="row">
            <div class="pull-left">
                <a class="btn btn-primary" href="{{ url('/admin') }}">
                    <i class="fa fa-btn fa-arrow-left"></i> Back
                </a>
            </div>
        </div>
    </div>

@endsection
