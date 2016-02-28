<?php

use App\State;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTournamentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tournaments', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('tournament_id');
            $table->string('name');
            $table->integer('state_id')->unsigned();
            $table->boolean('active')->default(true);
            $table->timestamps();

            $table->foreign('state_id')->references('state_id')->on('states');
        });
        DB::table('tournaments')->insert([
            [
                'name'   => 'March Madness',
                'active' => 1,
                'state_id' => State::where('name','setup')->first()->state_id
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tournaments');
    }
}
