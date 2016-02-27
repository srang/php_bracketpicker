<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateBracketsDeletePolicy extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('brackets', function (Blueprint $table) {
            $table->dropForeign('brackets_root_game_foreign');
            $table->foreign('root_game')->references('game_id')->on('games')->onDelete('cascade');
            //
        });
        Schema::table('games', function (Blueprint $table) {
            $table->dropForeign('games_child_game_a_foreign');
            $table->dropForeign('games_child_game_b_foreign');
            $table->foreign('child_game_a')->references('game_id')->on('games')->onDelete('cascade');
            $table->foreign('child_game_b')->references('game_id')->on('games')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropForeign('brackets_root_game_foreign');
            $table->foreign('root_game')->references('game_id')->on('games');
        });
        Schema::table('brackets', function (Blueprint $table) {
            $table->dropForeign('games_child_game_a_foreign');
            $table->dropForeign('games_child_game_b_foreign');
            $table->foreign('child_game_a')->references('game_id')->on('games');
            $table->foreign('child_game_b')->references('game_id')->on('games');
        });
    }
}
