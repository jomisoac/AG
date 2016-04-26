(function() {
    'use strict';

    angular
        .module('app.rutas.mostrar', [])
        .config(config)
        .run(run);

    function config($stateProvider){
        $stateProvider
            .state('app.mostrar_rutas', {
                url: '/rutas',
                templateUrl: 'rutas/mostrar/mostrar.html',
                onlyAcces: [
                    'all'
                ]
            })
    };

    function run(appMenu){
        appMenu.addTo([
            {nombre:'Rutas', link:'app.mostrar_rutas', icon:'perm_identity'}
        ], 'all');
    }
})();