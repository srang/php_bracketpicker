<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDefaultRegionForTeams extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('regions')->insert(
            [
                'region' => ''
            ]
        );

        DB::table('teams')->update(['region_id'=>DB::table('regions')->where('region','')->first()->region_id]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('teams')->where('region_id',DB::table('regions')->where('region','')->first()->region_id)->update(['region_id',NULL]);
    }
}
