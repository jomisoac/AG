(function() {
    'use strict';

    angular
        .module('app.nodos.nuevo', [])
        .config(config)
        .run(run);

    function config($stateProvider){
        $stateProvider
            .state('app.nodo_nuevo', {
                url: '/nodos',
                templateUrl: 'nodos/nuevo/nuevo.html',
                data: {
                    onlyAccess: 'all'
                }
            })
    };

    function run(appMenu){
        appMenu.addTo([
            {nombre:'Nodos', link:'app.nodo_nuevo', icon:'perm_identity'}
        ], 'all');
    }
})();