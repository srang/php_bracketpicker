<?php
namespace App\Math;

class Subtraction extends Operator
{

    public function __construct($value)
    {
        parent::__construct($value);
        $this->precidence = $this::ADD_SUB;
    }

    public function operate(Stack $stack)
    {
        $left = $stack->pop()->operate($stack);
        $right = $stack->pop()->operate($stack);
        return $right - $left;
    }

}
