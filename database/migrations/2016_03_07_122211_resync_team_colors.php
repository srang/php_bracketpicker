<?php

use App\Team;
use App\Region;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ResyncTeamColors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Team::where('name','Belmont')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Belmont',
                    'mascot'        => 'Bruins',
                    'icon_path'     => '/path/to/icon',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff0000'
            ]);
        } else {
            DB::table('teams')->where('name','Belmont')->update([
                    'mascot'        => 'Bruins',
                    'icon_path'     => '/path/to/icon',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','Bucknell')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Bucknell',
                    'mascot'        => 'Bison',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff6600',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Bucknell')->update([
                    'mascot'        => 'Bison',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff6600'
            ]);
        }
        if (!Team::where('name','Hampton')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Hampton',
                    'mascot'        => 'Pirates',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Hampton')->update([
                    'mascot'        => 'Pirates',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Hawaii')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Hawaii',
                    'mascot'        => 'Rainbow Warriors',
                    'primary_color' => '004d00',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Hawaii')->update([
                    'mascot'        => 'Rainbow Warriors',
                    'primary_color' => '004d00',
                    'primary_color' => '004d00',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','New Mexico State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'New Mexico State',
                    'mascot'        => 'Aggies',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','New Mexico State')->update([
                    'mascot'        => 'Aggies',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','North Florida')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'North Florida',
                    'mascot'        => 'Ospreys',
                    'primary_color' => '6161ff',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','North Florida')->update([
                    'mascot'        => 'Ospreys',
                    'primary_color' => '6161ff',
                    'primary_color' => '6161ff',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Stephen F. Austin')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Stephen F. Austin',
                    'mascot'        => 'Lumberjacks',
                    'primary_color' => '800080',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Stephen F. Austin')->update([
                    'mascot'        => 'Lumberjacks',
                    'primary_color' => '800080',
                    'primary_color' => '800080',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Texas Southern')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Texas Southern',
                    'mascot'        => 'Tigers',
                    'primary_color' => 'b3b3b3',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Texas Southern')->update([
                    'mascot'        => 'Tigers',
                    'primary_color' => 'b3b3b3',
                    'primary_color' => 'b3b3b3',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','UAB')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'UAB',
                    'mascot'        => 'Blazers',
                    'primary_color' => '008000',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','UAB')->update([
                    'mascot'        => 'Blazers',
                    'primary_color' => '008000',
                    'primary_color' => '008000',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','Wagner')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Wagner',
                    'mascot'        => 'Seahawks',
                    'primary_color' => '008000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Wagner')->update([
                    'mascot'        => 'Seahawks',
                    'primary_color' => '008000',
                    'primary_color' => '008000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Weber State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Weber State',
                    'mascot'        => 'Wildcats',
                    'primary_color' => '800080',
                    'accent_color'  => 'c4c4c4',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Weber State')->update([
                    'mascot'        => 'Wildcats',
                    'primary_color' => '800080',
                    'primary_color' => '800080',
                    'accent_color'  => 'c4c4c4'
            ]);
        }
        if (!Team::where('name','Winthrop ')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Winthrop ',
                    'mascot'        => 'Eagles',
                    'primary_color' => 'cc5200',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Winthrop ')->update([
                    'mascot'        => 'Eagles',
                    'primary_color' => 'cc5200',
                    'primary_color' => 'cc5200',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','Akron')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Akron',
                    'mascot'        => 'Zipa',
                    'primary_color' => '757500',
                    'accent_color'  => '0000a3',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Akron')->update([
                    'mascot'        => 'Zipa',
                    'primary_color' => '757500',
                    'primary_color' => '757500',
                    'accent_color'  => '0000a3'
            ]);
        }
        if (!Team::where('name','Alabama')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Alabama',
                    'mascot'        => 'Crimson Tide',
                    'primary_color' => 'a30000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Alabama')->update([
                    'mascot'        => 'Crimson Tide',
                    'primary_color' => 'a30000',
                    'primary_color' => 'a30000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Arizona State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Arizona State',
                    'mascot'        => 'Sun Devils',
                    'primary_color' => '9e3f00',
                    'accent_color'  => '949400',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Arizona State')->update([
                    'mascot'        => 'Sun Devils',
                    'primary_color' => '9e3f00',
                    'primary_color' => '9e3f00',
                    'accent_color'  => '949400'
            ]);
        }
        if (!Team::where('name','Arizona')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Arizona',
                    'mascot'        => 'Wildcats',
                    'primary_color' => '00008f',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Arizona')->update([
                    'mascot'        => 'Wildcats',
                    'primary_color' => '00008f',
                    'primary_color' => '00008f',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','Arkansas-Little Rock')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Arkansas-Little Rock',
                    'mascot'        => 'Trojans',
                    'primary_color' => '610000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Arkansas-Little Rock')->update([
                    'mascot'        => 'Trojans',
                    'primary_color' => '610000',
                    'primary_color' => '610000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Baylor')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Baylor',
                    'mascot'        => 'Bears',
                    'primary_color' => '006600',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Baylor')->update([
                    'mascot'        => 'Bears',
                    'primary_color' => '006600',
                    'primary_color' => '006600',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','Butler')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Butler',
                    'mascot'        => 'Bulldogs',
                    'primary_color' => '000000',
                    'accent_color'  => '5c5cff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Butler')->update([
                    'mascot'        => 'Bulldogs',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => '5c5cff'
            ]);
        }
        if (!Team::where('name','California')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'California',
                    'mascot'        => 'Bears',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000d1',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','California')->update([
                    'mascot'        => 'Bears',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000d1'
            ]);
        }
        if (!Team::where('name','Chattanooga')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Chattanooga',
                    'mascot'        => 'Mocs',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000ff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Chattanooga')->update([
                    'mascot'        => 'Mocs',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000ff'
            ]);
        }
        if (!Team::where('name','Cincinnati')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Cincinnati',
                    'mascot'        => 'Bearcats',
                    'primary_color' => '000000',
                    'accent_color'  => 'a30000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Cincinnati')->update([
                    'mascot'        => 'Bearcats',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'a30000'
            ]);
        }
        if (!Team::where('name','Colorado')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Colorado',
                    'mascot'        => 'Buffalos',
                    'primary_color' => '000000',
                    'accent_color'  => '9e9e00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Colorado')->update([
                    'mascot'        => 'Buffalos',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => '9e9e00'
            ]);
        }
        if (!Team::where('name','Connecticut')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Connecticut',
                    'mascot'        => 'Huskies',
                    'primary_color' => '00008a',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Connecticut')->update([
                    'mascot'        => 'Huskies',
                    'primary_color' => '00008a',
                    'primary_color' => '00008a',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Davidson')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Davidson',
                    'mascot'        => 'Wildcats',
                    'primary_color' => 'ff0000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Davidson')->update([
                    'mascot'        => 'Wildcats',
                    'primary_color' => 'ff0000',
                    'primary_color' => 'ff0000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Dayton')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Dayton',
                    'mascot'        => 'Flyers',
                    'primary_color' => '0000f5',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Dayton')->update([
                    'mascot'        => 'Flyers',
                    'primary_color' => '0000f5',
                    'primary_color' => '0000f5',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','Duke')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Duke',
                    'mascot'        => 'Blue Devils',
                    'primary_color' => '0000cc',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Duke')->update([
                    'mascot'        => 'Blue Devils',
                    'primary_color' => '0000cc',
                    'primary_color' => '0000cc',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Florida State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Florida State',
                    'mascot'        => 'Seminoles',
                    'primary_color' => 'a80000',
                    'accent_color'  => '8f8f00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Florida State')->update([
                    'mascot'        => 'Seminoles',
                    'primary_color' => 'a80000',
                    'primary_color' => 'a80000',
                    'accent_color'  => '8f8f00'
            ]);
        }
        if (!Team::where('name','Florida')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Florida',
                    'mascot'        => 'Gators',
                    'primary_color' => '0000d6',
                    'accent_color'  => 'ff6600',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Florida')->update([
                    'mascot'        => 'Gators',
                    'primary_color' => '0000d6',
                    'primary_color' => '0000d6',
                    'accent_color'  => 'ff6600'
            ]);
        }
        if (!Team::where('name','George Washington')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'George Washington',
                    'mascot'        => 'Colonials',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000ff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','George Washington')->update([
                    'mascot'        => 'Colonials',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000ff'
            ]);
        }
        if (!Team::where('name','Georgetown')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Georgetown',
                    'mascot'        => 'Hoyas',
                    'primary_color' => 'a1a1a1',
                    'accent_color'  => '000085',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Georgetown')->update([
                    'mascot'        => 'Hoyas',
                    'primary_color' => 'a1a1a1',
                    'primary_color' => 'a1a1a1',
                    'accent_color'  => '000085'
            ]);
        }
        if (!Team::where('name','Georgia Tech')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Georgia Tech',
                    'mascot'        => 'Yellow Jackets',
                    'primary_color' => '000000',
                    'accent_color'  => 'a8a800',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Georgia Tech')->update([
                    'mascot'        => 'Yellow Jackets',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'a8a800'
            ]);
        }
        if (!Team::where('name','Georgia')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Georgia',
                    'mascot'        => 'Bulldogs',
                    'primary_color' => '000000',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Georgia')->update([
                    'mascot'        => 'Bulldogs',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','Gonzaga')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Gonzaga',
                    'mascot'        => 'Bulldogs',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'bdbdbd',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Gonzaga')->update([
                    'mascot'        => 'Bulldogs',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'bdbdbd'
            ]);
        }
        if (!Team::where('name','Hofstra')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Hofstra',
                    'mascot'        => 'Pride',
                    'primary_color' => '7575ff',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Hofstra')->update([
                    'mascot'        => 'Pride',
                    'primary_color' => '7575ff',
                    'primary_color' => '7575ff',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Indiana')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Indiana',
                    'mascot'        => 'Hoosiers',
                    'primary_color' => 'a30000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Indiana')->update([
                    'mascot'        => 'Hoosiers',
                    'primary_color' => 'a30000',
                    'primary_color' => 'a30000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Iowa State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Iowa State',
                    'mascot'        => 'Cyclones',
                    'primary_color' => 'ff0000',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Iowa State')->update([
                    'mascot'        => 'Cyclones',
                    'primary_color' => 'ff0000',
                    'primary_color' => 'ff0000',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','Iowa')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Iowa',
                    'mascot'        => 'Hawkeyes',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Iowa')->update([
                    'mascot'        => 'Hawkeyes',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','Kansas State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Kansas State',
                    'mascot'        => 'Wildcats',
                    'primary_color' => '800080',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Kansas State')->update([
                    'mascot'        => 'Wildcats',
                    'primary_color' => '800080',
                    'primary_color' => '800080',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Kansas')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Kansas',
                    'mascot'        => 'Jayhawks',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Kansas')->update([
                    'mascot'        => 'Jayhawks',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','Kentucky')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Kentucky',
                    'mascot'        => 'Wildcats',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Kentucky')->update([
                    'mascot'        => 'Wildcats',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','LSU')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'LSU',
                    'mascot'        => 'Tigers',
                    'primary_color' => '9e9e00',
                    'accent_color'  => '0000ff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','LSU')->update([
                    'mascot'        => 'Tigers',
                    'primary_color' => '9e9e00',
                    'primary_color' => '9e9e00',
                    'accent_color'  => '0000ff'
            ]);
        }
        if (!Team::where('name','Louisville')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Louisville',
                    'mascot'        => 'Cardinals',
                    'primary_color' => 'ff0000',
                    'accent_color'  => '000000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Louisville')->update([
                    'mascot'        => 'Cardinals',
                    'primary_color' => 'ff0000',
                    'primary_color' => 'ff0000',
                    'accent_color'  => '000000'
            ]);
        }
        if (!Team::where('name','Maryland')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Maryland',
                    'mascot'        => 'Terrapins',
                    'primary_color' => 'f50000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Maryland')->update([
                    'mascot'        => 'Terrapins',
                    'primary_color' => 'f50000',
                    'primary_color' => 'f50000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Miami (FL)')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Miami (FL)',
                    'mascot'        => 'Hurricanes',
                    'primary_color' => '008000',
                    'accent_color'  => 'ff6600',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Miami (FL)')->update([
                    'mascot'        => 'Hurricanes',
                    'primary_color' => '008000',
                    'primary_color' => '008000',
                    'accent_color'  => 'ff6600'
            ]);
        }
        if (!Team::where('name','Michigan State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Michigan State',
                    'mascot'        => 'Spartans',
                    'primary_color' => '006100',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Michigan State')->update([
                    'mascot'        => 'Spartans',
                    'primary_color' => '006100',
                    'primary_color' => '006100',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Michigan')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Michigan',
                    'mascot'        => 'Wolverines',
                    'primary_color' => '0000c7',
                    'accent_color'  => 'e0e000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Michigan')->update([
                    'mascot'        => 'Wolverines',
                    'primary_color' => '0000c7',
                    'primary_color' => '0000c7',
                    'accent_color'  => 'e0e000'
            ]);
        }
        if (!Team::where('name','Middle Tennessee')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Middle Tennessee',
                    'mascot'        => 'Blue Raiders',
                    'primary_color' => '4d4dff',
                    'accent_color'  => 'b8b8b8',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Middle Tennessee')->update([
                    'mascot'        => 'Blue Raiders',
                    'primary_color' => '4d4dff',
                    'primary_color' => '4d4dff',
                    'accent_color'  => 'b8b8b8'
            ]);
        }
        if (!Team::where('name','Monmouth')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Monmouth',
                    'mascot'        => 'Hawks',
                    'primary_color' => '7a7aff',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Monmouth')->update([
                    'mascot'        => 'Hawks',
                    'primary_color' => '7a7aff',
                    'primary_color' => '7a7aff',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','North Carolina')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'North Carolina',
                    'mascot'        => 'Tarheels',
                    'primary_color' => '7a7aff',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','North Carolina')->update([
                    'mascot'        => 'Tarheels',
                    'primary_color' => '7a7aff',
                    'primary_color' => '7a7aff',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Notre Dame')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Notre Dame',
                    'mascot'        => 'Fighting Irish',
                    'primary_color' => '0000a8',
                    'accent_color'  => 'dbdb00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Notre Dame')->update([
                    'mascot'        => 'Fighting Irish',
                    'primary_color' => '0000a8',
                    'primary_color' => '0000a8',
                    'accent_color'  => 'dbdb00'
            ]);
        }
        if (!Team::where('name','Ohio State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Ohio State',
                    'mascot'        => 'Buckeyes',
                    'primary_color' => 'a1a1a1',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Ohio State')->update([
                    'mascot'        => 'Buckeyes',
                    'primary_color' => 'a1a1a1',
                    'primary_color' => 'a1a1a1',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','Oklahoma')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Oklahoma',
                    'mascot'        => 'Sooners',
                    'primary_color' => 'ad0000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Oklahoma')->update([
                    'mascot'        => 'Sooners',
                    'primary_color' => 'ad0000',
                    'primary_color' => 'ad0000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Oregon State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Oregon State',
                    'mascot'        => 'Beavers',
                    'primary_color' => 'ff6600',
                    'accent_color'  => '000000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Oregon State')->update([
                    'mascot'        => 'Beavers',
                    'primary_color' => 'ff6600',
                    'primary_color' => 'ff6600',
                    'accent_color'  => '000000'
            ]);
        }
        if (!Team::where('name','Oregon')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Oregon',
                    'mascot'        => 'Ducks',
                    'primary_color' => '008000',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Oregon')->update([
                    'mascot'        => 'Ducks',
                    'primary_color' => '008000',
                    'primary_color' => '008000',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','Pittsburgh')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Pittsburgh',
                    'mascot'        => 'Panthers',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000a8',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Pittsburgh')->update([
                    'mascot'        => 'Panthers',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000a8'
            ]);
        }
        if (!Team::where('name','Princeton')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Princeton',
                    'mascot'        => 'Tigers',
                    'primary_color' => '000000',
                    'accent_color'  => 'ff6600',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Princeton')->update([
                    'mascot'        => 'Tigers',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'ff6600'
            ]);
        }
        if (!Team::where('name','Providence')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Providence',
                    'mascot'        => 'Friars',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Providence')->update([
                    'mascot'        => 'Friars',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Purdue')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Purdue',
                    'mascot'        => 'Boilermakers',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Purdue')->update([
                    'mascot'        => 'Boilermakers',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','SMU')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'SMU',
                    'mascot'        => 'Mustangs',
                    'primary_color' => 'e00000',
                    'accent_color'  => '0000ff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','SMU')->update([
                    'mascot'        => 'Mustangs',
                    'primary_color' => 'e00000',
                    'primary_color' => 'e00000',
                    'accent_color'  => '0000ff'
            ]);
        }
        if (!Team::where('name','Saint Joseph\'s')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Saint Joseph\'s',
                    'mascot'        => 'Hawks',
                    'primary_color' => 'b80000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Saint Joseph\'s')->update([
                    'mascot'        => 'Hawks',
                    'primary_color' => 'b80000',
                    'primary_color' => 'b80000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Saint Mary\'s')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Saint Mary\'s',
                    'mascot'        => 'Gaels',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Saint Mary\'s')->update([
                    'mascot'        => 'Gaels',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','San Diego State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'San Diego State',
                    'mascot'        => 'Aztecs',
                    'primary_color' => '000000',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','San Diego State')->update([
                    'mascot'        => 'Aztecs',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','Seton Hall')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Seton Hall',
                    'mascot'        => 'Pirates',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Seton Hall')->update([
                    'mascot'        => 'Pirates',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','South Carolina')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'South Carolina',
                    'mascot'        => 'Gamecocks',
                    'primary_color' => 'b80000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','South Carolina')->update([
                    'mascot'        => 'Gamecocks',
                    'primary_color' => 'b80000',
                    'primary_color' => 'b80000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','South Dakota State')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'South Dakota State',
                    'mascot'        => 'Jackrabbits',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000ff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','South Dakota State')->update([
                    'mascot'        => 'Jackrabbits',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000ff'
            ]);
        }
        if (!Team::where('name','St Bonaventure')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'St Bonaventure',
                    'mascot'        => 'Bonnies',
                    'primary_color' => '421b00',
                    'accent_color'  => '999999',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','St Bonaventure')->update([
                    'mascot'        => 'Bonnies',
                    'primary_color' => '421b00',
                    'primary_color' => '421b00',
                    'accent_color'  => '999999'
            ]);
        }
        if (!Team::where('name','Stanford')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Stanford',
                    'mascot'        => 'Cardinal',
                    'primary_color' => 'ad0000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Stanford')->update([
                    'mascot'        => 'Cardinal',
                    'primary_color' => 'ad0000',
                    'primary_color' => 'ad0000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Stony Brook')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Stony Brook',
                    'mascot'        => 'Seawolves',
                    'primary_color' => 'ff0000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Stony Brook')->update([
                    'mascot'        => 'Seawolves',
                    'primary_color' => 'ff0000',
                    'primary_color' => 'ff0000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Syracuse')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Syracuse',
                    'mascot'        => 'Orangemen',
                    'primary_color' => 'ff6600',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Syracuse')->update([
                    'mascot'        => 'Orangemen',
                    'primary_color' => 'ff6600',
                    'primary_color' => 'ff6600',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Temple')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Temple',
                    'mascot'        => 'Owls',
                    'primary_color' => '9e0000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Temple')->update([
                    'mascot'        => 'Owls',
                    'primary_color' => '9e0000',
                    'primary_color' => '9e0000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Texas A&M')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Texas A&M',
                    'mascot'        => 'Aggies',
                    'primary_color' => 'ad0000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Texas A&M')->update([
                    'mascot'        => 'Aggies',
                    'primary_color' => 'ad0000',
                    'primary_color' => 'ad0000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Texas Tech')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Texas Tech',
                    'mascot'        => 'Red Raiders',
                    'primary_color' => 'ff0000',
                    'accent_color'  => '000000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Texas Tech')->update([
                    'mascot'        => 'Red Raiders',
                    'primary_color' => 'ff0000',
                    'primary_color' => 'ff0000',
                    'accent_color'  => '000000'
            ]);
        }
        if (!Team::where('name','Texas')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Texas',
                    'mascot'        => 'Longhorns',
                    'primary_color' => 'bd4b00',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Texas')->update([
                    'mascot'        => 'Longhorns',
                    'primary_color' => 'bd4b00',
                    'primary_color' => 'bd4b00',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Tulsa')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Tulsa',
                    'mascot'        => 'Golden Hurricanes',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff0000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Tulsa')->update([
                    'mascot'        => 'Golden Hurricanes',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ff0000'
            ]);
        }
        if (!Team::where('name','UC Irvine')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'UC Irvine',
                    'mascot'        => 'Anteaters',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000ff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','UC Irvine')->update([
                    'mascot'        => 'Anteaters',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '0000ff'
            ]);
        }
        if (!Team::where('name','UCLA')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'UCLA',
                    'mascot'        => 'Bruins',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','UCLA')->update([
                    'mascot'        => 'Bruins',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','UNC Wilmington')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'UNC Wilmington',
                    'mascot'        => 'Seahawks',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','UNC Wilmington')->update([
                    'mascot'        => 'Seahawks',
                    'primary_color' => '0000ff',
                    'primary_color' => '0000ff',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','USC')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'USC',
                    'mascot'        => 'Trojans',
                    'primary_color' => 'd60000',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','USC')->update([
                    'mascot'        => 'Trojans',
                    'primary_color' => 'd60000',
                    'primary_color' => 'd60000',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','Utah')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Utah',
                    'mascot'        => 'Utes',
                    'primary_color' => 'ff0000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Utah')->update([
                    'mascot'        => 'Utes',
                    'primary_color' => 'ff0000',
                    'primary_color' => 'ff0000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','VCU')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'VCU',
                    'mascot'        => 'Rams',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '000000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','VCU')->update([
                    'mascot'        => 'Rams',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '000000'
            ]);
        }
        if (!Team::where('name','Valparaiso')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Valparaiso',
                    'mascot'        => 'Crusaders',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '612700',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Valparaiso')->update([
                    'mascot'        => 'Crusaders',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '612700'
            ]);
        }
        if (!Team::where('name','Vanderbilt')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Vanderbilt',
                    'mascot'        => 'Commodores',
                    'primary_color' => '000000',
                    'accent_color'  => 'b2b300',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Vanderbilt')->update([
                    'mascot'        => 'Commodores',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'b2b300'
            ]);
        }
        if (!Team::where('name','Villanova')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Villanova',
                    'mascot'        => 'Wildcats',
                    'primary_color' => '000085',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Villanova')->update([
                    'mascot'        => 'Wildcats',
                    'primary_color' => '000085',
                    'primary_color' => '000085',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Virginia')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Virginia',
                    'mascot'        => 'Cavaliers',
                    'primary_color' => '0000b3',
                    'accent_color'  => 'ff6600',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Virginia')->update([
                    'mascot'        => 'Cavaliers',
                    'primary_color' => '0000b3',
                    'primary_color' => '0000b3',
                    'accent_color'  => 'ff6600'
            ]);
        }
        if (!Team::where('name','Washington')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Washington',
                    'mascot'        => 'Huskies',
                    'primary_color' => '800080',
                    'accent_color'  => '999900',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Washington')->update([
                    'mascot'        => 'Huskies',
                    'primary_color' => '800080',
                    'primary_color' => '800080',
                    'accent_color'  => '999900'
            ]);
        }
        if (!Team::where('name','West Virginia')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'West Virginia',
                    'mascot'        => 'Mountaineers',
                    'primary_color' => '0000d1',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','West Virginia')->update([
                    'mascot'        => 'Mountaineers',
                    'primary_color' => '0000d1',
                    'primary_color' => '0000d1',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','Wichita St')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Wichita St',
                    'mascot'        => 'Shockers',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffff00',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Wichita St')->update([
                    'mascot'        => 'Shockers',
                    'primary_color' => '000000',
                    'primary_color' => '000000',
                    'accent_color'  => 'ffff00'
            ]);
        }
        if (!Team::where('name','William & Mary')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'William & Mary',
                    'mascot'        => 'Tribe',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '008000',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','William & Mary')->update([
                    'mascot'        => 'Tribe',
                    'primary_color' => 'ffff00',
                    'primary_color' => 'ffff00',
                    'accent_color'  => '008000'
            ]);
        }
        if (!Team::where('name','Wisconsin')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Wisconsin',
                    'mascot'        => 'Badgers',
                    'primary_color' => 'eb0000',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Wisconsin')->update([
                    'mascot'        => 'Badgers',
                    'primary_color' => 'eb0000',
                    'primary_color' => 'eb0000',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Xavier')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Xavier',
                    'mascot'        => 'Musketeers',
                    'primary_color' => '0000a3',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Xavier')->update([
                    'mascot'        => 'Musketeers',
                    'primary_color' => '0000a3',
                    'primary_color' => '0000a3',
                    'accent_color'  => 'ffffff'
            ]);
        }
        if (!Team::where('name','Yale')->exists()) {
            DB::table('teams')->insert([
                    'name'          => 'Yale',
                    'mascot'        => 'Eli',
                    'primary_color' => '0000c2',
                    'accent_color'  => 'ffffff',
                    'icon_path'     => '/path'
            ]);
        } else {
            DB::table('teams')->where('name','Yale')->update([
                    'mascot'        => 'Eli',
                    'primary_color' => '0000c2',
                    'primary_color' => '0000c2',
                    'accent_color'  => 'ffffff'
            ]);
        }
        DB::table('teams')->where('name','TBD')->update([
                'primary_color' => 'AAA',
                'accent_color'  => '000'
        ]);
        $null_region = Region::where('region','')->first()->region_id;
        DB::table('teams')->where('region_id',null)->update([
            'region_id' => $null_region
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    }
}
