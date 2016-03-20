<?php
namespace App\Math;

class Addition extends Operator
{

    public function __construct($value)
    {
        parent::__construct($value);
        $this->precidence = $this::ADD_SUB;
    }

    public function operate(Stack $stack)
    {
        return $stack->pop()->operate($stack) + $stack->pop()->operate($stack);
    }

}
