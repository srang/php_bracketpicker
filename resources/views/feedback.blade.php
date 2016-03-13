@extends('layouts.app')

@section('content')
    <div class="container">
@include('common.alerts')
@include('common.errors')
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4>Feedback Form</h4>
            </div>
            <div class="panel-body">
            <!-- Display Validation Errors -->
                <form class="form-horizontal" action="{{ url('/feedback') }}" method="POST">
                    {!! csrf_field() !!}
                    <div class='row'>
                        <div class='col-md-2'>
@include('common.back_button',[ 'back_link'=>url('/home')])
                        </div>
                        <div class='col-md-2 pull-right'>
                            <button type='submit' class='btn btn-success pull-right'>
                                <i class="fa fa-btn fa-envelope"></i> Send
                            </button>
                        </div>
                    </div>

                    <div>
                        <div class='form-group'>
                            <label for='sender' class='col-md-3 col-md-offset-1 control-label'>Sender Email</label>
                            <div class='col-md-7'>
                                <input type='email' name='sender' class='form-control' placeholder='you@youremail.com'
                                        value='{{ !empty(old('sender'))?old('sender'):Auth::user()->email }}'>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label for='subject' class='col-md-3 col-md-offset-1 control-label'>Subject</label>
                            <div class="col-md-7">
                                <input type='text' name='subject' class='form-control' placeholder='A Tale Of Two Brackets'>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label for='content' class='col-md-3 col-md-offset-1 control-label'>Content</label>
                            <div class="col-md-7">
                                <textarea name='content' class='form-control' placeholder='Email body here...' rows=7></textarea>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
