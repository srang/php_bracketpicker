@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="panel-body">
        <!-- Display Validation Errors -->
@include('common.alerts')
@include('common.errors')
        <p>more coming soon</p>
@include('common.back_button',[ 'back_link'=>url('/home')])
        </div>
    </div>
@endsection
