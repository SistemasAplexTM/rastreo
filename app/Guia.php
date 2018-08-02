<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Guia extends Model
{
    use SoftDeletes;
	
    protected $fillable = ['numero', 'fecha_embarque', 'fecha_dex'];
    protected $dates = ['deleted_at'];
}
