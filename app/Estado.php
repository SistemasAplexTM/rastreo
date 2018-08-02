<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Estado extends Model
{
	use SoftDeletes;
	
    protected $fillable = ['descripcion', 'color'];
    protected $dates = ['deleted_at'];
}
