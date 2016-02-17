<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MasterBracketTest extends TestCase
{

/*
 * Test that save works with only some fields filled
 * Test that save with duplicates will only save one (should make consistent which one
 * Test that save with bad team name will not work
 * Test that save failure preserves entries and unsaved status + error
 * Test that submit requires all fields to be filled with valid teams
 * Test that submit requires all teams to be in ONE game
 */

    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
}
