@extends('layouts.app')

@section('content')
    <div class="container">
       <div class="panel-body">
            <!-- Display Validation Errors -->
@include('common.errors')
@include('common.alerts')
            <!-- New Team Form -->
            <form action="{{ url('admin/team/'.$team->team_id) }}" method="POST">
                {!! method_field('PUT') !!}
@include('admin.team_form')
                <div class="pull-left">
                    <a class="btn btn-primary" href="{{ url('/admin/teams') }}">
                        <i class="fa fa-btn fa-arrow-left"></i> Back
                    </a>
                </div>
                <!-- Save Team Button -->
                <div class="form-group">
                    <div class="pull-right">
                        <button type="submit" class="btn btn-primary">
                            <i class="fa fa-btn fa-pencil"></i> Update Team
                        </button>
                    </div>
                </div>
            </form>
        </div>
@endsection
