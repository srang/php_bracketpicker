<div class="bracket-body container-fluid">
    <!-- Top Half -->
    <div class="bracket-row">
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 1 {{ $region=$regions->shift()->region }}</h4>
@for($i=1; $i <= 8; $i++)
@include($game_container,[ 'game' => $games->get('1')->shift(), 'game_num' => $i ])
@endfor
        </div>
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 2 {{ $region }}</h4>
@for($i=1; $i <= 4; $i++)
@include($game_container,[ 'game' => $games->get('2')->shift(), 'game_num' => $i ])
        <br>
@endfor
        </div>
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 3 {{ $region }}</h4>
@for($i=1; $i <= 2; $i++)
@include($game_container,[ 'game' => $games->get('3')->shift(), 'game_num' => $i ])
@endfor
        <br>
        <div class="col-md-2 bracket-round">
        </div>
        <br>
            <h4 class="bracket-round-title">Round 3 {{ $region=$regions->shift()->region }}</h4>
@for($i=3; $i <= 4; $i++)
@include($game_container,[ 'game' => $games->get('3')->shift(), 'game_num' => $i ])
@endfor
        </div>
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 2 {{ $region }}</h4>
@for($i=5; $i <= 8; $i++)
@include($game_container,[ 'game' => $games->get('2')->shift(), 'game_num' => $i ])
        <br>
@endfor
        </div>
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 1 {{ $region }}</h4>
@for($i=9; $i <= 16; $i++)
@include($game_container,[ 'game' => $games->get('1')->shift(), 'game_num' => $i ])
@endfor
        </div>
    </div>

    <!-- Middle -->
    <div class="bracket-row">
        <div class="col-md-2 bracket-round">
@for($i=1; $i <= 2; $i++)
@include($game_container,[ 'game' => $games->get('4')->shift(), 'game_num' => $i ])
@endfor
        </div>
        <div class="col-md-2 bracket-round">
@include($game_container,[ 'game' => $games->get('5')->shift(), 'game_num' => 1 ])
        </div>
        <div class="col-md-1 bracket-round">
@include($game_container,[ 'game' => $games->get('6')->shift(), 'game_num' => 1 ])
        </div>
        <div class="col-md-2 bracket-round">
@include($game_container,[ 'game' => $games->get('5')->shift(), 'game_num' => 2 ])
        </div>
        <div class="col-md-2 bracket-round">
@for($i=3; $i <= 4; $i++)
@include($game_container,[ 'game' => $games->get('4')->shift(), 'game_num' => $i ])
@endfor
        </div>
    </div>

    <!-- Bottom Half -->
    <div class="bracket-row">
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 1 {{ $region=$regions->shift()->region }}</h4>
@for($i=17; $i <= 24; $i++)
@include($game_container,[ 'game' => $games->get('1')->shift(), 'game_num' => $i ])
@endfor
        </div>
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 2 {{ $region }}</h4>
@for($i=9; $i <= 12; $i++)
@include($game_container,[ 'game' => $games->get('2')->shift(), 'game_num' => $i ])
        <br>
@endfor
        </div>
        <div class="col-md-3 bracket-round">
            <h4 class="bracket-round-title">Round 3 {{ $region }}</h4>
@for($i=5; $i <= 6; $i++)
@include($game_container,[ 'game' => $games->get('3')->shift(), 'game_num' => $i ])
@endfor
        <br>
        <br>
            <h4 class="bracket-round-title">Round 3 {{ $region=$regions->shift()->region }}</h4>
@for($i=7; $i <= 8; $i++)
@include($game_container,[ 'game' => $games->get('3')->shift(), 'game_num' => $i ])
@endfor
        </div>
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 2 {{ $region }}</h4>
@for($i=13; $i <= 16; $i++)
@include($game_container,[ 'game' => $games->get('2')->shift(), 'game_num' => $i ])
        <br>
@endfor
        </div>
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Round 1 {{ $region }}</h4>
@for($i=25; $i <= 32; $i++)
@include($game_container,[ 'game' => $games->get('1')->shift(), 'game_num' => $i ])
@endfor
        </div>
    </div>
</div>
