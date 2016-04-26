/**
 * Created by tav0 on 4/01/16.
 */

(function() {
    'use strict';

    angular
        .module('app.rutas.mostrar')
        .service('rutasService', rutasService);

    function rutasService($http, API) {
        this.getAll = function () {
            return $http.get(API+'/rutas');
        }

        this.get = function (id) {
            return $http.get(API+'/rutas/' + id);
        }

        this.put = function (object, id) {
            return $http.put(API+'/rutas/' + id, object);
        }

        this.delete = function (id) {
            return $http.delete(API+'/rutas/' + id);
        }
    }
})();