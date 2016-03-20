<?php
namespace App\Math;

abstract class TerminalExpression
{

    /**
     * operator and expression precidence codes
     */
    const OPERATOR_BASE = 0;
    const ADD_SUB = 4;
    const MULT_DIV = 5;
    const PARENTHESIS = 6;

    protected $value = '';

    public function __construct($value)
    {
        $this->value = $value;
    }

    public static function factory($value)
    {
        if (is_object($value) && $value instanceof TerminalExpression) {
            return $value;
        } elseif (is_numeric($value)) {
            return new Number($value);
        } elseif ($value == '+') {
            return new Addition($value);
        } elseif ($value == '-') {
            return new Subtraction($value);
        } elseif ($value == '*') {
            return new Multiplication($value);
        } elseif ($value == '/') {
            return new Division($value);
        } elseif (in_array($value, array('(', ')'))) {
            return new Parenthesis($value);
        }
        throw new Exception('Undefined Value ' . $value);
    }

    abstract public function operate(Stack $stack);

    public function isOperator()
    {
        return false;
    }

    public function isParenthesis()
    {
        return false;
    }

    public function isNoOp()
    {
        return false;
    }

    public function render()
    {
        return $this->value;
    }
}
