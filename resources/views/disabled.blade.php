@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    <p>{{ $user->name }} your account has not been disabled. If you think this has been done in error, please contact an administrator</p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
