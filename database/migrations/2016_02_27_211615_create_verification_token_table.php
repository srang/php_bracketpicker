<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVerificationTokenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('verification_tokens', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('verification_id');
            $table->string('token');
            $table->integer('user_id')->unsigned()->unique();
            $table->date('expires');
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('verification_tokens');
    }
}
