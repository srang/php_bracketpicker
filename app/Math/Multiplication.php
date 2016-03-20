<?php
namespace App\Math;

class Multiplication extends Operator
{

    public function __construct($value)
    {
        parent::__construct($value);
        $this->precidence = $this::MULT_DIV;
    }

    public function operate(Stack $stack)
    {
        return $stack->pop()->operate($stack) * $stack->pop()->operate($stack);
    }

}
