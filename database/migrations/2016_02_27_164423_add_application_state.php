<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddApplicationState extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('states', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('state_id');
            $table->string('name');
            $table->integer('next_id')->unsigned()->nullable();
            $table->integer('prev_id')->unsigned()->nullable();
            $table->timestamps();

            $table->foreign('next_id')->references('state_id')->on('states');
            $table->foreign('prev_id')->references('state_id')->on('states');
        });
        DB::table('states')->insert([
            [ 'name'   => 'setup' ],
            [ 'name'   => 'submission' ],
            [ 'name'   => 'active' ],
            [ 'name'   => 'complete' ]
        ]);
        $next = DB::table('states')->where('name','submission')->first();
        DB::table('states')->where('name','setup')->update(['next_id' => $next->state_id]);
        $next = DB::table('states')->where('name','active')->first();
        $prev = DB::table('states')->where('name','setup')->first();
        DB::table('states')->where('name','submission')->update(['next_id' => $next->state_id, 'prev_id' => $prev->state_id]);
        $next = DB::table('states')->where('name','complete')->first();
        $prev = DB::table('states')->where('name','submission')->first();
        DB::table('states')->where('name','active')->update(['next_id' => $next->state_id, 'prev_id' => $prev->state_id]);
        $prev = DB::table('states')->where('name','active')->first();
        DB::table('states')->where('name','complete')->update(['next_id' => $next->state_id, 'prev_id' => $prev->state_id]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('states');
    }
}
