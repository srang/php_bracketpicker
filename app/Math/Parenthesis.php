<?php
namespace App\Math;

class Parenthesis extends TerminalExpression
{

    protected $precidence;

    public function __construct($value)
    {
        parent::__construct($value);
        $this->precidence = $this::PARENTHESIS;
    }


    public function operate(Stack $stack)
    {
    }

    public function getPrecidence()
    {
        return $this->precidence;
    }

    public function isNoOp()
    {
        return true;
    }

    public function isParenthesis()
    {
        return true;
    }

    public function isOpen()
    {
        return $this->value == '(';
    }

}
