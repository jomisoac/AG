(function() {
    'use strict';

    angular
        .module('app.rutas.mostrar')
        .controller('GrafosController', GrafosController);

    function GrafosController(rutasService, nodosService, $filter) {
        var vm = this;
        vm.nodes = new vis.DataSet([]);
        vm.edges = new vis.DataSet([]);
        vm.options = {};
        vm.container = document.getElementById('network');

        vm.data = {
            nodes: vm.nodes,
            edges: vm.edges
        };

        var network = new vis.Network(vm.container, vm.data, vm.options);

        // Definición de Variables para la depuración por Consola
        var deb = {
            nodes: vm.nodes,
            edges: vm.edges,
            data: vm.data,
            options: vm.options,
            container: vm.container
        };

        // Calculo del Camino mas Corto con Libreria de Dijkstra
        vm.addConexion = function(nodoInicial, nodoFinal, valorDistancia){
            valorDistancia = parseInt(valorDistancia,10);
            var buscarNodo = $filter('filter')(grafoDijkstra, {origen: nodoInicial });
            if (buscarNodo.length === 0) {
                var conexion = [];
                conexion.push({
                    destino: nodoFinal,
                    distancia: valorDistancia
                });
                grafoDijkstra.push({origen: nodoInicial, conexiones: conexion });
            }else{
                buscarNodo[0].conexiones.push({destino: nodoFinal, distancia: valorDistancia});
            }

        };

        vm.camino = [];

        vm.shortestPath = function(){
            var grafoDijkstra = [];
            angular.forEach(vm.edges._data, function(value, key){
                vm.addConexion(value.from, value.to, value.label);
                vm.addConexion(value.to, value.from, value.label);
            });

            console.log(vm.edges)
            console.log(deb.edges)

            var g = new Graph();
            angular.forEach(grafoDijkstra, function(value, key){
                var enlaces = {};
                angular.forEach(value.conexiones, function(conexion, i){
                    enlaces[conexion.destino] = conexion.distancia;
                });
                g.addVertex(value.origen, enlaces);
            });
            var i = vm.nodoInicial.id.toString();
            var f = vm.nodoFinal.id.toString();
            console.log(g.shortestPath(i, f).concat(i).reverse());
            vm.camino = g.shortestPath(i, f).concat(i).reverse();
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
                    deb.edges.add({
                        from: ruta.origen_id,
                        to: ruta.destino_id,
                        label: ruta.distancia+ ' Km desde '+ ruta.origen+ ' hasta ' + ruta.destino});
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
                    deb.nodes.add({
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