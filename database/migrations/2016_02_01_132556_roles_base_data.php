<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RolesBaseData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      DB::table('roles')->insert([
        [ 'role' => 'superuser' ],
        [ 'role' => 'admin' ],
        [ 'role' => 'user' ]
      ]);
        //
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      DB::table('roles')->whereIn(
        'role',['superuser','admin','user']
      )->delete();
    }
}
