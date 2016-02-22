<?php

namespace App\Strategies;

use Illuminate\Http\Request;

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
    public function validate(Request $req);

}

