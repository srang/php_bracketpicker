@extends('layouts.app')

@section('content')
        <div class="bracket-body container">
            <div class="row bracket-row">
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 8; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('1')->shift() ])
@endfor
                </div>
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 4; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('2')->shift() ])
                <br>
@endfor
                </div>
                <div class="col-md-3 bracket-round">
@for($i=0; $i < 2; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('3')->shift() ])
@endfor
                <br>
                <br>
@for($i=0; $i < 2; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('3')->shift() ])
@endfor
                </div>
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 4; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('2')->shift() ])
                <br>
@endfor
                </div>
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 8; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('1')->shift() ])
@endfor
                </div>
            </div>

            <div class="row bracket-row">
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 2; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('4')->shift() ])
@endfor
                </div>
                <div class="col-md-2 bracket-round">
@include('brackets.bracketgame',[ 'game' => $games->get('5')->shift() ])
                </div>
                <div class="col-md-3 bracket-round">
@include('brackets.bracketgame',[ 'game' => $games->get('6')->shift() ])
                </div>
                <div class="col-md-2 bracket-round">
@include('brackets.bracketgame',[ 'game' => $games->get('5')->shift() ])
                </div>
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 2; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('4')->shift() ])
@endfor
                </div>
            </div>

            <div class="row bracket-row">
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 8; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('1')->shift() ])
@endfor
                </div>
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 4; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('2')->shift() ])
                <br>
@endfor
                </div>
                <div class="col-md-3 bracket-round">
@for($i=0; $i < 2; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('3')->shift() ])
@endfor
                <br>
                <br>
@for($i=0; $i < 2; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('3')->shift() ])
@endfor
                </div>
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 4; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('2')->shift() ])
                <br>
@endfor
                </div>
                <div class="col-md-2 bracket-round">
@for($i=0; $i < 8; $i++)
@include('brackets.bracketgame',[ 'game' => $games->get('1')->shift() ])
@endfor
                </div>
            </div>
        </div>
    </div>

@endsection