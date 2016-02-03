<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    /**
     * Override the default primary key
     *
     * @var array
     */
    protected $primaryKey = 'blog_id';

}
