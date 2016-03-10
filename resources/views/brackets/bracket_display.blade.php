@extends('layouts.app')

@section('content')
        <div class="container">
@include('common.alerts')
            <!-- Bracket Form -->
            <div class="row">
@include('brackets.teaminfo')
                <form action="{{ $bracket_link }}" method="POST">
                    {!! method_field('PUT') !!}
@include('brackets.bracket_form')
@include('common.back_button')
                    <!-- Save Bracket -->
                    <div class="form-group">
                        <div class="pull-right">
                            <div class='btn-group'>
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-btn fa-pencil"></i> Save
                                </button>
                                <a class="btn btn-info" href="{{ Request::url() }}">
                                    <i class="fa fa-btn fa-refresh"></i> Reset
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
@include('brackets.bracket_body')

@endsection