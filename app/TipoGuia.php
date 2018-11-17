<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class TipoGuia extends Model
{
    // use SoftDeletes;

    protected $fillable = ['descripcion'];
    // protected $dates = ['deleted_at'];
}
