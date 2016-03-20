<?php

use App\Math\Math;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MathTest extends TestCase
{
    protected $math;

    /**
     * create test team
     */
    public function setUp()
    {
        parent::setUp();
        $this->math = new Math();
    }

    /**
     * Test simple expressions with each operator
     *
     * @return void
     */
    public function testOperators()
    {
        $answer = $this->math->evaluate('2 + 2');
        $this->assertEquals($answer, 4);
        $answer = $this->math->evaluate('2 - 2');
        $this->assertEquals($answer, 0);

        $answer = $this->math->evaluate('2 * 3');
        $this->assertEquals($answer, 6);
        $answer = $this->math->evaluate('2 / 2');
        $this->assertEquals($answer, 1);

    }
}
