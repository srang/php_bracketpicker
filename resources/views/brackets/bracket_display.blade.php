@extends('layouts.app')

@section('content')
@include('common.errors')
@include('common.alerts')
        <div class="container">
            <!-- Bracket Form -->
            <div class="row">
                <form action="{{ $bracket_link }}" method="POST">
                    {!! method_field('PUT') !!}
@include('brackets.bracket_form')
@include('common.back_button')
                    <!-- Save Bracket -->
                    <div class="form-group">
                        <div class="pull-right">
                            <button type="submit" class="btn btn-primary">
                                <i class="fa fa-btn fa-pencil"></i> Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
@include('brackets.bracket_body')
        </div>
    </div>

@endsection