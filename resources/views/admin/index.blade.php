@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Admin Dashboard</div>

                <div class="panel-body">
                    {{ Auth::user()->name }} is logged in as admin
                    <br>
                    <div class="list-group">
                        <div class="list-group-item">
                            <a href={{ url('admin/teams') }}>Teams</a>: view and update teams with their colors, mascot, rank and region
                        </div>
                        <div class="list-group-item">
                            <a href={{ url('admin/brackets') }}>Brackets</a>: view and update user and master brackets
                        </div>
                        <div class="list-group-item">
                            <a href={{ url('admin/users') }}>Users</a>: view and update users 
                        </div>
                    </div>
                </div>
            </div>
@include('common.back_button',[ 'back_link'=>url('/home')])
        </div>
    </div>
</div>
@endsection
