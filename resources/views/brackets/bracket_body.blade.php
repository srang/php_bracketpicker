<div class="bracket-body container-fluid">
    <!-- Top Half -->
    <div class="bracket-row">
@include('brackets.first_rounds',[ 'regionl' => $regions->get(0)->region,'regionr' => $regions->get(1)->region, 'r1c' => 1, 'r2c' => 1, 'r3c' => 1 ])
    </div>

    <!-- Middle -->
    <div class="bracket-row">
        <div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">{{ $regions->get(0)->region }} Finals</h4>
@include($game_container,[ 'game' => $games->get('4')->shift(), 'game_num' => 1 ])
            <br>
            <h4 class="bracket-round-title">{{ $regions->get(1)->region }} Finals</h4>
@include($game_container,[ 'game' => $games->get('4')->shift(), 'game_num' => 2 ])
        </div><!--
     --><div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Final Four</h4>
@include($game_container,[ 'game' => $games->get('5')->shift(), 'game_num' => 1 ])
        </div><!--
     --><div class="col-md-4 bracket-round">
            <div class="col-md-8 col-md-offset-2">
            <h4 class="bracket-round-title">National Championship</h4>
@include($game_container,[ 'game' => $games->get('6')->shift(), 'game_num' => 1 ])
            </div>
        </div><!--
     --><div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">Final Four</h4>
@include($game_container,[ 'game' => $games->get('5')->shift(), 'game_num' => 2 ])
        </div><!--
     --><div class="col-md-2 bracket-round">
            <h4 class="bracket-round-title">{{ $regions->get(2)->region }} Finals</h4>
@include($game_container,[ 'game' => $games->get('4')->shift(), 'game_num' => 3 ])
            <br>
            <h4 class="bracket-round-title">{{ $regions->get(3)->region }} Finals</h4>
@include($game_container,[ 'game' => $games->get('4')->shift(), 'game_num' => 4 ])
        </div>
    </div>

    <!-- Bottom Half -->
    <div class="bracket-row">
@include('brackets.first_rounds',[ 'regionl' => $regions->get(2)->region,'regionr' => $regions->get(3)->region, 'r1c' => 17, 'r2c' => 9, 'r3c' => 5 ])
    </div>
</div>
