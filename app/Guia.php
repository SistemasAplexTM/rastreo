<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Guia extends Model
{
    // use SoftDeletes;

    protected $fillable = ['type_guide_id', 'number', 'shipping_date', 'dex_date'];
    // protected $dates = ['deleted_at'];

}
