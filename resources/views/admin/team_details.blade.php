@extends('layouts.app')

@section('content')
    <div class="container">
       <div class="panel-body">
            <!-- Display Validation Errors -->
@include('common.errors')
            <!-- New Team Form -->
            <form action="{{ url('admin/team/'.$team->team_id) }}" method="POST">
                {!! method_field('PUT') !!}
@include('common.team_form')
                <!-- Add Team Button -->
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
