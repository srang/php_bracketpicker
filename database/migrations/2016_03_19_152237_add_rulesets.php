<?php

use App\Ruleset;
use App\Rule;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRulesets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('rulesets')->insert([
            'name' => 'Bull Moose',
            'desc' => 'This is the ruleset description but it is sort of complicated to do off the top of my head'
        ]);
        $ruleset_id = Ruleset::where('name','Bull Moose')->first()->ruleset_id;
        DB::table('rules')->insert([
            'round_id' => 1,
            'ruleset_id' => $ruleset_id,
            'rule' => '$RANK'
        ]);
        DB::table('rules')->insert([
            'round_id' => 2,
            'ruleset_id' => $ruleset_id,
            'rule' => '$RANK * $ROUND'
        ]);
        DB::table('rules')->insert([
            'round_id' => 3,
            'ruleset_id' => $ruleset_id,
            'rule' => '$RANK * $ROUND + 10'
        ]);
        DB::table('rules')->insert([
            'round_id' => 4,
            'ruleset_id' => $ruleset_id,
            'rule' => '$RANK * $ROUND + 25'
        ]);
        DB::table('rules')->insert([
            'round_id' => 5,
            'ruleset_id' => $ruleset_id,
            'rule' => '$RANK * $ROUND + 40'
        ]);
        DB::table('rules')->insert([
            'round_id' => 6,
            'ruleset_id' => $ruleset_id,
            'rule' => '$RANK * $ROUND + 65'
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
        Rule::where('ruleset_id',$ruleset_id)->delete();
        Ruleset::where('ruleset_id',$ruleset_id)->delete();
    }
}
