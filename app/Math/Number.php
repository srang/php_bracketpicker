<?php
namespace App\Math;

class Number extends TerminalExpression
{

    public function operate(Stack $stack)
    {
        return $this->value;
    }

}
