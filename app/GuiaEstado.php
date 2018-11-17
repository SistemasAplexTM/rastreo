<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GuiaEstado extends Model
{
    protected $fillable = ['observacion', 'fecha', 'guia_id', 'estado_id', 'user_id']; 
}
