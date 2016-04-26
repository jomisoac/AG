<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nodos extends Model
{
    protected $table = 'nodos';

    protected $fillable = ['nombre_nodo'];

    public $timestamps = false;

    public function rutas()
    {
        return $this->hasMany(Rutas::class, 'id_nodo_origen', 'id')
            ->select('id', 'id_nodo_destino', 'id_nodo_origen', 'distancia',
                'cantidad_peajes','tipo_via', 'seguridad_via', 'condiciones_via',
                'estado_via', 'tiempo');
    }
}
