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
                        <a class="list-group-item" href={{ url('admin/teams') }}>Teams</a>
                        <a class="list-group-item" href={{ url('admin/bracket') }}>Master Bracket</a>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
