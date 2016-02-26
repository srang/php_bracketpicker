<?php

use App\Status;
use App\Region;
/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->email,
        'status_id' => Status::where('status','unverified')->first()->status_id,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Team::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'rank' => $faker->numberBetween($min=1, $max=16),
        'region_id' => Region::where('region','<>','')->first()->region_id,
        'mascot' => $faker->firstName,
        'icon_path' => $faker->url,
        'primary_color' => $faker->hexcolor,
        'accent_color' => $faker->hexcolor
    ];
});

$factory->define(App\Game::class, function (Faker\Generator $faker) {
    $team_a = $this->create(App\Team::class);
    $team_b = $this->create(App\Team::class);
    return [
        'team_a' => $team_a->team_id,
        'team_b' => $team_b->team_id,
        'master' => 0,
        'round_id' => 1,
    ];
});

$factory->define(App\Bracket::class, function (Faker\Generator $faker) {
    $owner = $this->create(App\User::class);
    $root = $this->create(App\Game::class);
    return [
        'name' => $faker->name.'\'s Bracket',
        'user_id' => $owner->user_id,
        'master' => 0,
        'root_game' => $root->game_id,
    ];
});
