<?php

use App\Ruleset;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddBonusrules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $ruleset_id = Ruleset::where('name','Bull Moose')->first()->ruleset_id;
        DB::table('bonusrules')->insert([
            'ruleset_id' => $ruleset_id,
            'rule' => 'ScoreFinalFourBonusRuleStrategy'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $ruleset_id = Ruleset::where('name','Bull Moose')->first()->ruleset_id;
        BonusRule::where('ruleset_id',$ruleset_id)->delete();
    }
}
