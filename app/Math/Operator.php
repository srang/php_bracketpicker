<?php
namespace App\Math;

abstract class Operator extends TerminalExpression
{

    protected $precidence;
    protected $leftAssoc;

    public function __construct($value)
    {
        parent::__construct($value);
        $this->precidence = $this::OPERATOR_BASE;
        $this->leftAssoc = true;
    }



    public function getPrecidence()
    {
        return $this->precidence;
    }

    public function isLeftAssoc()
    {
        return $this->leftAssoc;
    }

    public function isOperator()
    {
        return true;
    }

}
