<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBloglinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bloglinks', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->increments('link_id');
            $table->integer('blog_id')->unsigned();
            $table->integer('linktype_id')->unsigned();
            $table->timestamps();

            $table->foreign('blog_id')->references('blog_id')->on('blogs');
            $table->foreign('linktype_id')->references('linktype_id')->on('linktypes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('bloglinks');
    }
}
