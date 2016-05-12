<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/', function () {
    echo '<script>location.href="app";</script>';
});
Route::group(['middleware' => 'cors'], function () {
//    nodos
    Route::get('/api/nodos', 'NodosController@getNodos');
    Route::get('/api/nodos/{nodo_id}', 'NodosController@showNodo');
    Route::post('/api/nodos', 'NodosController@postNodo');
    Route::put('/api/nodos/{nodo_id}', 'NodosController@updateNodo');
    Route::delete('/api/nodos/{nodo_id}', 'NodosController@deleteNodo');
//    rutas
    Route::get('/api/rutas', 'RutasController@getRutas');
    Route::get('/api/rutas/nodo/{nodo_id}', 'RutasController@getRutasNodo');
    Route::post('/api/rutas/rutaoptima/nodos', 'RutasController@rutaOptima');
    Route::post('/api/rutas', 'RutasController@postRuta');
    Route::delete('/api/rutas/{nodo_id}', 'RutasController@deleteRuta');
});