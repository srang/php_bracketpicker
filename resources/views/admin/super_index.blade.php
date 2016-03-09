@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Admin Dashboard</div>

                <div class="panel-body">
                    {{ Auth::user()->name }} is logged in as superuser
                    <br>
                    <div class="list-group">
                        <div class="list-group-item">
                            <a href={{ url('/super/reset') }}>Reset</a>: reset tournament
                        </div>
                        <div class="list-group-item">
                            <a href={{ url('/super/setup') }}>Setup</a>: set team ranks
                        </div>
                        <div class="list-group-item">
                            <a href={{ url('/super/submit') }}>Submit</a>: open bracket submission
                        </div>
                        <div class="list-group-item">
                            <a href={{ url('/super/activate') }}>Activate</a>: close bracket submission
                        </div>
                    </div>
                </div>
            </div>
@include('common.back_button',[ 'back_link'=>url('/home')])
        </div>
    </div>
</div>
@endsection
