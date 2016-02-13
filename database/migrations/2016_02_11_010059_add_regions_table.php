<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRegionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regions', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('region_id');
            $table->string('region');
            $table->timestamps();
        });
        DB::table('regions')->insert([
            [ 'region' => 'East' ],
            [ 'region' => 'West' ],
            [ 'region' => 'South' ],
            [ 'region' => 'Midwest' ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('regions');
    }
}
