<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rutas extends Model
{
    protected $table = 'rutas';

    protected $fillable = ['id_nodo_origen', 'id_nodo_destino', 'cantidad_peajes', 'tiempo'];

    public $timestamps = false;
}
