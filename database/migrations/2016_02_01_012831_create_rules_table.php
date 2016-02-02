<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rules', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('rule_id');
            $table->integer('ruleset_id')->unsigned();
            $table->integer('round_id')->unsigned();
            $table->string('rule');
            $table->timestamps();

            $table->foreign('ruleset_id')->references('ruleset_id')->on('rulesets');
            $table->unique(['ruleset_id','round_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('rules');
    }
}
