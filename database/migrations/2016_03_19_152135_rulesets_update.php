<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RulesetsUpdate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rulesets', function (Blueprint $table) {
            $table->renameColumn('ruleset','name');
            $table->text('desc');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rulesets', function (Blueprint $table) {
            $table->dropColumn('desc');
            $table->renameColumn('name','ruleset');
        });
    }
}
