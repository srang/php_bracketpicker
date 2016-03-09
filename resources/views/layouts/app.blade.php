<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ $tourney_name }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
@stack('styles')
    <link href="{{ elixir('css/frontend.css') }}" rel="stylesheet">
</head>
<body id="app-layout">
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">

                <!-- Collapsed Hamburger -->
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <!-- Branding Image -->
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ $tourney_name }}
                </a>
            </div>

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav">
@if (Auth::check() && Auth::user()->confirmed())
@if (Auth::user()->hasRole('user'))
                    <li><a href="{{ url('/home') }}">Home</a></li>
                    <li><a href="{{ url('/brackets') }}">Brackets</a></li>
@if (Auth::user()->hasRole('admin'))
                    <li><a href="{{ url('/admin') }}">Admin</a></li>
@endif {{-- is admin --}}
@if (Auth::user()->hasRole('superuser'))
                    <li><a href="{{ url('/super') }}">Super</a></li>
@endif {{-- is superuser --}}
@endif {{-- is user --}}
@endif {{-- is auth --}}
                </ul>
                <!-- Right Side Of Navbar -->
                <ul class="nav navbar-nav navbar-right">
                    <!-- Authentication Links -->
@if (Auth::check())
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <ul class="dropdown-menu" role="menu">
                                <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
                            </ul>
                        </li>
@else
                        <li><a href="{{ url('/login') }}">Login</a></li>
                        <li><a href="{{ url('/register') }}">Register</a></li>
@endif
                </ul>
            </div>
        </div>
    </nav>

@yield('content')

    <!-- Footer -->

    <!-- Javascript -->
    {{--<script src="{{ elixir('js/jquery.js') }}"></script>   --}}
    {{--<script src="{{ elixir('js/bootstrap.js') }}"></script>--}}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>  
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
@stack('scripts')
</body>
</html>
