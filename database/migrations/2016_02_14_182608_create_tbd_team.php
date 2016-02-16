<?php

use App\Region;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTbdTeam extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $regions = Region::where('region','<>','')->get();
        foreach ($regions as $region) {
            DB::table('teams')->insert([
                [
                    'name'          => 'TBD',
                    'mascot'        => '',
                    'region_id'     => $region->region_id,
                    'primary_color' => 'AAAAAA',
                    'accent_color'  => '000000',
                    'icon_path'     => '/path/to/icon'
                ]
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('teams')->where('name','TBD')->delete();
    }
}
