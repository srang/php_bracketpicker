@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Unverified Account</div>
                <div class="panel-body">
                    <h4>
                        {{ $user->name }}, your account has not been verified.
                        <br>
                        <small> You have been sent a link with a verification token if you would like us to resend the link, please click below:</small>
                    </h4>
                    <div class="center-block">
                        <a class="btn btn-success col-md-4 col-md-offset-4" href="{{ url('/home') }}">Resend my verification link</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
