<?php

use App\Status;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRobotUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      DB::table('users')->insert([
          [
              'name' => 'Mr Roboto',
              'email' => 'noreply@google.com',
              'status_id' => Status::where('status','disabled')->first()->status_id,
              'password' => bcrypt('i4mN0taRo80tNoT'),
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
      DB::table('users')->where('email','noreply@google.com')->delete();
    }
}
