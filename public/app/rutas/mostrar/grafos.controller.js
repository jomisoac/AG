(function() {
    'use strict';

    angular
        .module('app.rutas.mostrar')
        .controller('GrafosController', GrafosController);

    function GrafosController(rutasService, nodosService, $filter) {
        var vm = this;
        vm.nodes = new vis.DataSet([]);
        vm.edges = new vis.DataSet([]);
        vm.options = {
            "edges": {
                "smooth": {
                    "forceDirection": "vertical",
                    "roundness": 1
                }
            },
            "physics": {
                "forceAtlas2Based": {
                    "springLength": 100
                },
                "maxVelocity": 49,
                "minVelocity": 0.75,
                "solver": "forceAtlas2Based"
            }
        };

        vm.container = document.getElementById('network');

        vm.data = {
            nodes: vm.nodes,
            edges: vm.edges
        };

        var network = new vis.Network(vm.container, vm.data, vm.options);

        // Definición de Variables para la depuración por Consola
        vm.deb = {
            nodes: vm.nodes,
            edges: vm.edges,
            data: vm.data,
            container: vm.container
        };

        // Calculo del Camino mas Corto con Libreria de Dijkstra
        vm.addConexion = function(nodoInicial, nodoFinal, valorDistancia){
            valorDistancia = parseInt(valorDistancia,10);
            var buscarNodo = $filter('filter')(vm.grafoDijkstra, {origen: nodoInicial });
            if (buscarNodo.length === 0) {
                var conexion = [];
                conexion.push({
                    destino: nodoFinal,
                    distancia: valorDistancia
                });
                vm.grafoDijkstra.push({origen: nodoInicial, conexiones: conexion });
            }else{
                buscarNodo[0].conexiones.push({destino: nodoFinal, distancia: valorDistancia});
            }
        };

        vm.camino = [];

        vm.shortestPath = function(){
            vm.grafoDijkstra = [];
            angular.forEach(vm.deb.edges, function(value, key){
                vm.addConexion(value.from, value.to, value.label);
                vm.addConexion(value.to, value.from, value.label);
            });

            var g = new Graph();
            angular.forEach(vm.grafoDijkstra, function(value, key){
                var enlaces = {};
                angular.forEach(value.conexiones, function(conexion, i){
                    enlaces[conexion.destino] = conexion.distancia;
                });
                g.addVertex(value.origen, enlaces);
            });
            var i = vm.nodoInicial.id.toString();
            var f = vm.nodoFinal.id.toString();
            // console.log(g.shortestPath(i, f).concat(i).reverse());
            vm.caminos = g.shortestPath(i, f).concat(i).reverse();
            console.log(vm.caminos)

            vm.otrocamino = {};
            rutasService.rutaOptima(vm.caminos).then(function (p) {
                vm.otrocamino = p.data;
            }, function (error) {
                console.log('Un error', error)
            });
            // vm.caminos.forEach(function (nodo) {
            //     nodosService.get(nodo).then(function (p) {
            //         vm.otrocamino.push(p.data.nombre_nodo);
            //     }, function (error) {
            //         console.log('Un error', error)
            //     });
            // })
            console.log(vm.otrocamino)
        };

        init();
        function init() {
            vm.rutas = [];
            vm.nodos = [];
            loadNodos();
            loadRutas();
        }

        function loadRutas() {
            rutasService.getAll().then(success, error);
            function success(p) {
                vm.rutas = p.data;
                angular.forEach(vm.rutas, function(ruta) {
                    vm.deb.edges.add({
                        from: ruta.origen_id,
                        to: ruta.destino_id,
                        // label:ruta.f_objetivo,
                        label: ruta.distancia+ ' Km desde '+ ruta.origen+ ' hasta ' + ruta.destino,
                        f_objetivo: ruta.f_objetivo
                    });

                });
            }

            function error(error) {
                console.log('Error al cargar datos');
            }
        }

        function loadNodos() {
            nodosService.getAll().then(success, error);
            function success(p) {
                vm.nodos = p.data;
                angular.forEach(vm.nodos, function (nodo) {
                    vm.deb.nodes.add({
                        id: nodo.id,
                        label: nodo.nombre_nodo});
                });
            }
            function error(error) {
                console.log('Error al cargar datos');
            }
        }
    }
})();