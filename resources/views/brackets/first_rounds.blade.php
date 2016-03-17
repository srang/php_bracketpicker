        <div class="col-md-2 bracket-round round-one">
            <h4 class="bracket-round-title">Round 1 {{ $regionl }}</h4>
@for($i=$r1c; $i < $r1c+8; $i++)
@include($game_container,[ 'game' => $games->get('1')->shift(), 'game_num' => $i ])
@endfor
        </div><!--
        {{-- bootstrap bug requires no whitespace here --}}
     --><div class="col-md-2 bracket-round round-two">
            <h4 class="bracket-round-title">Round 2 {{ $regionl }}</h4>
@for($i=$r2c; $i < $r2c+4; $i++)
@include($game_container,[ 'game' => $games->get('2')->shift(), 'game_num' => $i ])
        <br>
@endfor
        </div><!--
     --><div class="col-md-2 bracket-round round-three">
            <h4 class="bracket-round-title">Round 3 {{ $regionl }}</h4>
@for($i=$r3c; $i < $r3c+2; $i++)
@include($game_container,[ 'game' => $games->get('3')->shift(), 'game_num' => $i ])
            <br><br>
@endfor
        </div><!--
     --><div class="col-md-2 bracket-round round-three">
            <h4 class="bracket-round-title">Round 3 {{ $regionr }}</h4>
@for($i=$r3c+2; $i < $r3c+4; $i++)
@include($game_container,[ 'game' => $games->get('3')->shift(), 'game_num' => $i ])
            <br><br>
@endfor
        </div><!--
     --><div class="col-md-2 bracket-round round-two">
            <h4 class="bracket-round-title">Round 2 {{ $regionr }}</h4>
@for($i=$r2c+4; $i < $r2c+8; $i++)
@include($game_container,[ 'game' => $games->get('2')->shift(), 'game_num' => $i ])
        <br>
@endfor
        </div><!--
     --><div class="col-md-2 bracket-round round-one">
            <h4 class="bracket-round-title">Round 1 {{ $regionr }}</h4>
@for($i=$r1c+8; $i < $r1c+16; $i++)
@include($game_container,[ 'game' => $games->get('1')->shift(), 'game_num' => $i ])
@endfor
        </div>
