<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nodos extends Model
{
    protected $table = 'nodos';

    protected $fillable = ['nombre_nodo'];

    public $timestamps = false;
}
