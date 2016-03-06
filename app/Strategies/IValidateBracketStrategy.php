<?php

namespace App\Strategies;

/**
 * Interface for bracket validation
 *
 */
interface IValidateBracketStrategy
{
    /**
     * Validate bracket from request
     *
     * @param  request
     * @return error collection
     */
    public function validate($req);

}

