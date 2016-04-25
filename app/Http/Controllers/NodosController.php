<?php

namespace App\Http\Controllers;

use App\Nodos;
use Illuminate\Http\Request;

use App\Http\Requests;
use Symfony\Component\HttpFoundation\JsonResponse;

class NodosController extends Controller
{
    public function getNodos(){
        $nodos = Nodos::all();
        return \Response::json($nodos);
    }

    public function showNodo($id){
        $nodo = Nodos::find($id);
        return $nodo;
    }
    public function postNodo(Request $request){
        $nodo = new Nodos();
        $nodo->nombre_nodo = $request['nombre_nodo'];
        if ($nodo->save())
            return \Response::json('Se guardo correctamente el nodo');
        else
            return \Response::json('No se puede guardar el nodo');
    }

    public function updateNodo(Request $request, $id){
        $nodo = $this->showNodo($id);
        $nodo->nombre_nodo = $request['nombre_nodo'];
        if ($nodo->save())
            return \Response::json('Se actualizo correctamente el nodo');
        else
            return \Response::json('No se puede actualizar el nodo');
    }

    public function deleteNodo($id){
        $nodo = $this->showNodo($id);
        if ($nodo->delete())
            return \Response::json('Se elimino el nodo correctamente');
        else
            return \Response::json('No se pudo eliminar el nodo');
    }
}
