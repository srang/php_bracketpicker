@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel panel-default">
                <div class="panel-heading">Unverified Account</div>
                <div class="panel-body">
                    <h4>
                        Welcome, {{ $user->name }}! You have been sent an email with a link that will verify your account.
                        <br>
                        <small> If you have not received the email and would like us to resend the link, please click below:</small>
                    </h4>
                    <div class="center-block">
                        <a class="btn btn-success col-md-4 col-md-offset-4" href="{{ url('/reverify') }}">Resend my verification link</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
