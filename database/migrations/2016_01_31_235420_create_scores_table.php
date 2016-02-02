<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scores', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('score_id');
            $table->integer('ruleset_id')->unsigned();
            $table->integer('bracket_id')->unsigned();
            $table->integer('score');
            $table->timestamps();

            $table->foreign('ruleset_id')->references('ruleset_id')->on('rulesets');
            $table->foreign('bracket_id')->references('bracket_id')->on('brackets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('scores');
    }
}
