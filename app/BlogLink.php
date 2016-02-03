<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BlogLink extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'link_id';

}
