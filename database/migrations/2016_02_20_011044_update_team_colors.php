<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateTeamColors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('teams')->where('name',"Oklahoma")
            ->update([
                'mascot'=>"Sooners",
                'primary_color'=> "ad0000",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Oregon")
            ->update([
                'mascot'=>"Ducks",
                'primary_color'=> "008000",
                'accent_color'=> "ffff00"
            ]);
        DB::table('teams')->where('name',"Villanova")
            ->update([
                'mascot'=>"Wildcats",
                'primary_color'=> "000085",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Kansas")
            ->update([
                'mascot'=>"Jayhawks",
                'primary_color'=> "0000ff",
                'accent_color'=> "ff0000"
            ]);
        DB::table('teams')->where('name',"Maryland")
            ->update([
                'mascot'=>"Terrapins",
                'primary_color'=> "f50000",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Virginia")
            ->update([
                'mascot'=>"Cavaliers",
                'primary_color'=> "0000b3",
                'accent_color'=> "ff6600"
            ]);
        DB::table('teams')->where('name',"Iowa")
            ->update([
                'mascot'=>"Hawkeyes",
                'primary_color'=> "000000",
                'accent_color'=> "ffff00"
            ]);
        DB::table('teams')->where('name',"Xavier")
            ->update([
                'mascot'=>"Musketeers",
                'primary_color'=> "0000a3",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"West Virginia")
            ->update([
                'mascot'=>"Mountaineers",
                'primary_color'=> "0000d1",
                'accent_color'=> "ffff00"
            ]);
        DB::table('teams')->where('name',"North Carolina")
            ->update([
                'mascot'=>"Sucks",
                'primary_color'=> "7a7aff",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Miami (FL)")
            ->update([
                'mascot'=>"Hurricanes",
                'primary_color'=> "008000",
                'accent_color'=> "ff6600"
            ]);
        DB::table('teams')->where('name',"Dayton")
            ->update([
                'mascot'=>"Flyers",
                'primary_color'=> "0000f5",
                'accent_color'=> "ff0000"
            ]);
        DB::table('teams')->where('name',"Iowa State")
            ->update([
                'mascot'=>"Cyclones",
                'primary_color'=> "ff0000",
                'accent_color'=> "ffff00"
            ]);
        DB::table('teams')->where('name',"Kentucky")
            ->update([
                'mascot'=>"Wildcats",
                'primary_color'=> "0000ff",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Utah")
            ->update([
                'mascot'=>"Utes",
                'primary_color'=> "ff0000",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Michigan State")
            ->update([
                'mascot'=>"Spartans",
                'primary_color'=> "006100",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"USC")
            ->update([
                'mascot'=>"Trojans",
                'primary_color'=> "d60000",
                'accent_color'=> "ffff00"
            ]);
        DB::table('teams')->where('name',"Texas A&M")
            ->update([
                'mascot'=>"Aggies",
                'primary_color'=> "ad0000",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Texas")
            ->update([
                'mascot'=>"Longhorns",
                'primary_color'=> "bd4b00",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Purdue")
            ->update([
                'mascot'=>"Boilermakers",
                'primary_color'=> "000000",
                'accent_color'=> "ffff00"
            ]);
        DB::table('teams')->where('name',"Duke")
            ->update([
                'mascot'=>"Blue Devils",
                'primary_color'=> "0000cc",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Florida")
            ->update([
                'mascot'=>"Gators",
                'primary_color'=> "0000d6",
                'accent_color'=> "ff6600"
            ]);
        DB::table('teams')->where('name',"Notre Dame")
            ->update([
                'mascot'=>"Fighting Irish",
                'primary_color'=> "0000a8",
                'accent_color'=> "dbdb00"
            ]);
        DB::table('teams')->where('name',"Baylor")
            ->update([
                'mascot'=>"Bears",
                'primary_color'=> "006600",
                'accent_color'=> "ffff00"
            ]);
        DB::table('teams')->where('name',"South Carolina")
            ->update([
                'mascot'=>"Gamecocks",
                'primary_color'=> "b80000",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Arizona")
            ->update([
                'mascot'=>"MASCOT",
                'primary_color'=> "00008f",
                'accent_color'=> "ff0000"
            ]);
        DB::table('teams')->where('name',"Saint Joseph's")
            ->update([
                'mascot'=>"Hawks",
                'primary_color'=> "b80000",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Providence")
            ->update([
                'mascot'=>"Friars",
                'primary_color'=> "000000",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Wichita St")
            ->update([
                'mascot'=>"Shockers",
                'primary_color'=> "000000",
                'accent_color'=> "ffff00"
            ]);
        DB::table('teams')->where('name',"Indiana")
            ->update([
                'mascot'=>"Hoosiers",
                'primary_color'=> "a30000",
                'accent_color'=> "ffffff"
            ]);
        DB::table('teams')->where('name',"Michigan")
            ->update([
                'mascot'=>"Wolverines",
                'primary_color'=> "0000c7",
                'accent_color'=> "e0e000"
            ]);
        DB::table('teams')->where('name',"Wisconsin")
            ->update([
                'mascot'=>"Badgers",
                'primary_color'=> "eb0000",
                'accent_color'=> "ffffff"
            ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('teams')->where('name','<>','TBD')
            ->update([
                'mascot'=>'MASCOT',
                'primary_color'=>'000000',
                'accent_color'=>'FFFFFF'
            ]);
        //
    }
}
