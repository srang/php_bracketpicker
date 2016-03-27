@extends('layouts.app')

@section('content')
<div class="container">
            <div class="jumbotron">
                <h2>Welcome, {{ $user->name }}!</h2>
                <p>
                    Welcome to our new site! We hope you are as exited as we are for our
                    leap into the digital age. With these changes there will undoubtedly
                    be growing pains but if you come across a problem please click the
                    <a href="{{ url('/feedback') }}">Feedback</a> link here or in the footer
                    and we will work to rectify things as quickly as possible! Also feel
                    free to just let us know what you think, good or bad. With that out of
                    the way, go ahead and play around!
                </p>
                <p>
                    <div class="btn-group col-md-offset-4">
@if($tourney_state->name != 'setup')
                        <a class="btn btn-primary btn-lg" href="{{ url('/brackets') }}" role="button">
                            <i class="fa fa-btn fa-sitemap"></i> Brackets
                        </a>
                        <a class="btn btn-primary btn-lg" href="{{ url('/standings') }}" role="button">
                            <i class="fa fa-btn fa-list-ol"></i> Standings
                        </a>
@endif
                        <a class="btn btn-primary btn-lg" href="{{ url('/posts') }}" role="button">
                            <i class="fa fa-btn fa-commenting"></i> Posts
                        </a>
                    </div>
                </p>
            </div>
@if (count($brackets) > 0)
        <div class="panel panel-default">
            <div class="panel-heading">
                Your Brackets
            </div>

            <div class="panel-body">
                <table class="table table-striped">

                    <!-- Table Headings -->
                    <thead>
                        <th>Bracket Name</th>
                        <th>Winner</th>
                        <th>Score</th>
                        <th>&nbsp;</th>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
@foreach ($brackets as $bracket)
                        <tr>
                            <!-- Bracket Info -->
@include('brackets.list_item')
                        </tr>
@endforeach
                    </tbody>
                </table>
            </div>
        </div>
@endif
    </div>
</div>
@endsection
