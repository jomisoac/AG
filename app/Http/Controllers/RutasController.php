<?php

namespace App\Http\Controllers;

use App\Nodos;
use App\Rutas;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;


class RutasController extends Controller
{
    public function getRutas(){
        $tnodos = Nodos::all();
        $rutas = [];
        $nodos = [];
        foreach ($tnodos as $nodo){
            foreach ($nodo->rutas as $ruta) {
                $rutas[] = [
                    'id' => $ruta->id,
                    'destino' => $ruta->destino->nombre_nodo,
                    'destino_id' => $ruta->destino->id,
                    'origen' => $nodo->nombre_nodo,
                    'origen_id' => $nodo->id,
                    'distancia' => $ruta->distancia,
                    'tiempo' => $ruta->tiempo,
                    'estado_via' => $ruta->estado_via,
                    'condiciones_via' => $ruta->condiciones_via,
                    'tipo_via' => $ruta->tipo_via,
                    'seguridad_via' => $ruta->seguridad_via,
                    'cantidad_peajes' => $ruta->cantidad_peajes,
                ];
            }
        }
        return \Response::json($rutas);
    }

    public function getRutasNodo($id){
        $nodo = Nodos::find($id);
        $rutas = [];
        foreach ($nodo->rutas as $ruta) {
            $rutas[] = [
                'id' => $ruta->id,
                'origen' => $ruta->origen,
                'destino' => $ruta->destino,
            ];
        }
        return $rutas;
    }
    public function showRuta($id){
        $ruta = Rutas::find($id);
        return $ruta;
    }
    public function postRuta(Request $request){
        $ruta = new Rutas();
        $ruta->id_nodo_origen = $request['id_nodo_origen'];
        $ruta->id_nodo_destino = $request['id_nodo_destino'];
        $ruta->tiempo = $request['tiempo'];
        $ruta->distancia = $request['distancia'];
        $ruta->estado_via = $request['estado_via'];
        $ruta->condiciones_via = $request['condiciones_via'];
        $ruta->seguridad_via = $request['seguridad_via'];
        $ruta->tipo_via = $request['tipo_via'];
        $ruta->cantidad_peajes = $request['cantidad_peajes'];
        $ruta->f_objetivo = $request['f_objetivo'];
        if ($ruta->save())
            return \Response::json('Se guardo correctamente ruta');
        else
            return \Response::json('No se puede guardar la ruta');
    }

    public function deleteRuta($id){
        $ruta = $this->showRuta($id);
        if ($ruta->delete())
            return \Response::json('Se elimino el ruta correctamente');
        else
            return \Response::json('No se pudo eliminar la ruta');
    }
    
    public function rutaOptima(Request $request){
        $datos = $request->all();
        $pila = array();

        for($i = 0; $i < count($datos); $i++){
            $nodo = Nodos::find($datos[$i])->select('nombre_nodo')->where('id', $datos[$i])->first();
            array_push($pila, $nodo);
        }
        return $pila;
    }
}
