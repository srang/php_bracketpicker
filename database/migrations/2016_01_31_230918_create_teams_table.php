<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teams', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('team_id');
            $table->string('name')->nullable();
            $table->string('mascot')->nullable();
            $table->string('icon_path');
            $table->string('primary_color',6)->default('111111');
            $table->string('accent_color',6)->default('DDDDDD');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('teams');
    }
}
