<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('game_id');
            $table->integer('team_a')->unsigned();
            $table->integer('team_b')->unsigned();
            $table->integer('score_a')->nullable();
            $table->integer('score_b')->nullable();
            $table->boolean('master')->default(false);
            $table->integer('winner')->unsigned()->nullable();
            $table->integer('round_id')->unsigned()->index();
            $table->integer('child_game_a')->unsigned();
            $table->integer('child_game_b')->unsigned();
            $table->timestamps();

            $table->foreign('team_a')->references('team_id')->on('teams');
            $table->foreign('team_b')->references('team_id')->on('teams');
            $table->foreign('winner')->references('team_id')->on('teams');
            $table->foreign('child_game_a')->references('game_id')->on('games');
            $table->foreign('child_game_b')->references('game_id')->on('games');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('games');
    }
}
