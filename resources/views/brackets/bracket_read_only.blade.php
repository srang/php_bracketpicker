@extends('layouts.app')

@section('content')
        <div class="container">
@include('common.alerts')
            <!-- Bracket Info -->
            <div class="row">
@include('brackets.team_info')
@include('brackets.bracket_info')
@include('common.back_button')
                <!-- Save Bracket -->
                <div class="pull-right">
                    <div class='btn-group'>
                        <a class="btn btn-primary" href="{{ $bracket_link.'/print' }}" target="_blank">
                            <i class="fa fa-btn fa-print"></i> Print
                        </a>
                    </div>
                </div>
            </div>
        </div>
@include('brackets.bracket_body')

@endsection