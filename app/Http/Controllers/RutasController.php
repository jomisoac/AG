<?php

namespace App\Http\Controllers;

use App\Rutas;
use Illuminate\Http\Request;

use App\Http\Requests;

class RutasController extends Controller
{
    public function getRutas(){
        $rutas = Rutas::all();
        return \Response::json($rutas);
    }

    public function showRuta($id){
        $ruta = Rutas::find($id);
        return $ruta;
    }
    public function postRuta(Request $request){
        $ruta = new Rutas($request->all());
        if ($ruta)
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
}
