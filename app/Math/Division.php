<?php
namespace App\Math;

class Division extends Operator
{

    public function __construct($value)
    {
        parent::__construct($value);
        $this->precidence = $this::MULT_DIV;
    }

    public function operate(Stack $stack)
    {
        $left = $stack->pop()->operate($stack);
        $right = $stack->pop()->operate($stack);
        return $right / $left;
    }

}
