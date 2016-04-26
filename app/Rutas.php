<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rutas extends Model
{
    protected $table = 'rutas';

    protected $fillable = ['id_nodo_origen', 'id_nodo_destino', 'cantidad_peajes',
        'tiempo', 'distancia', 'estado_via', 'tipo_via', 'condiciones_via', 'seguridad_via'];

    public $timestamps = false;

    public function origen()
    {
        return $this->belongsTo(Nodos::class, 'id_nodo_origen', 'id');
    }

    public function destino()
    {
        return $this->belongsTo(Nodos::class, 'id_nodo_destino', 'id');
    }
}
