<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UserStatusesPopulate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('statuses', function (Blueprint $table) {
            $table->unique('status');
        });
        DB::table('statuses')->insert([
          [ 'status' => 'unverified' ],
          [ 'status' => 'active' ],
          [ 'status' => 'disabled' ],
          [ 'status' => 'expired' ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('statuses', function (Blueprint $table) {
            $table->dropUnique('status');
        });
        DB::table('statuses')->whereIn(
            'status',['unverified','active','disabled','expired']
        )->delete();
    }
}
