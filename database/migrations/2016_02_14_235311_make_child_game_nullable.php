<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeChildGameNullable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('games', function (Blueprint $table) {
            $table->integer('child_game_a')->unsigned()->nullable()->change();
            $table->integer('child_game_b')->unsigned()->nullable()->change();
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
            $table->integer('child_game_a')->unsigned()->nullable(false)->change();
            $table->integer('child_game_b')->unsigned()->nullable(false)->change();
        });
    }
}
