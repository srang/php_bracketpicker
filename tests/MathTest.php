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

    /**
     * Test parenthesis and order of operations
     *
     * @return void
     */
    public function testPrecedence()
    {
        $answer = $this->math->evaluate('2 + 2 * 3');
        $this->assertEquals($answer, 8);
        $answer = $this->math->evaluate('3 * 2 + 2');
        $this->assertEquals($answer, 8);

        $answer = $this->math->evaluate('3 * 2 - 2');
        $this->assertEquals($answer, 4);
        $answer = $this->math->evaluate('8 - 2 * 3');
        $this->assertEquals($answer, 2);

        $answer = $this->math->evaluate('(3 + 1) * (3 - 1)');
        $this->assertEquals($answer, 8);

        $answer = $this->math->evaluate('(3 * 2) * 3');
        $this->assertEquals($answer, 18);

        $answer = $this->math->evaluate('((3 * 2) * 3) - 4');
        $this->assertEquals($answer, 14);
        $answer = $this->math->evaluate('(((3 * 2) * 3) - 4) * 2');
        $this->assertEquals($answer, 28);
    }

    /**
     *  Test variable registration
     *
     * @return void
     */
    public function testVariables()
    {
        $this->math->registerVariable('ROUND', 2);
        $this->math->registerVariable('RANK', 12);
        $answer = $this->math->evaluate('2 * $RANK');
        $this->assertEquals($answer, 24);
        $answer = $this->math->evaluate('(2 + $RANK) * $ROUND');
        $this->assertEquals($answer, 28);
        $answer = $this->math->evaluate('(2 + $RANK) * $ROUND + 25');
        $this->assertEquals($answer, 53);

        $this->math->registerVariable('RANK', 4);
        $answer = $this->math->evaluate('2 * $RANK');
        $this->assertEquals($answer, 8);
        $answer = $this->math->evaluate('(2 + $RANK) * $ROUND');
        $this->assertEquals($answer, 12);
        $answer = $this->math->evaluate('(2 + $RANK) * $ROUND + 24');
        $this->assertEquals($answer, 36);
    }

}
