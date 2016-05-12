(function() {
    'use strict';

    angular
        .module('app.nodos.nuevo')
        .controller('nodosController', nodosController);

    function nodosController(nodosService) {
        var vm = this;
        vm.nodo = {};
        vm.ruta = {};
        vm.editMode = false;
        vm.nombreForm = "";
        vm.active = "";

        //funciones
        vm.nuevo = nuevo;
        vm.guardar = guardar;
        vm.actualizar = actualizar;
        vm.update = update;
        vm.eliminar = eliminar;
        //funciones rutas
        vm.nuevaRuta = nuevaRuta;
        vm.guardarRuta = guardarRuta;
        
        init();
        function init() {
            vm.nodos = [];
            loadNodos();
        }

        function loadNodos() {
            nodosService.getAll().then(success, error);
            function success(p) {
                vm.nodos = p.data;
            }

            function error(error) {
                console.log('Error al cargar datos');
            }
        }

        function nuevo() {
            vm.nodo = {}
            vm.nombreForm = "Nueva nodo";
            vm.active = "";
            vm.editMode = false;
            $("#modalNuevoNodo").openModal();
        }

        function guardar() {
            nodosService.post(vm.nodo).then(success, error);
            function success(p) {
                $("#modalNuevoNodo").closeModal();
                init();
                Materialize.toast('Registro guardado correctamente', 5000);
            }

            function error(error) {
                console.log('Error al guardar');
            }
        }

        function actualizar(nodo) {
            vm.nodo = nodo;
            vm.editMode = true;
            vm.nombreForm = "Modificar nodo";
            vm.active = "active";
            $("#modalNuevoNodo").openModal();
        }


        function update() {
            nodosService.put(vm.nodo, vm.nodo.id).then(success, error);
            function success(p) {
                $("#modalNuevoNodo").closeModal();
                vm.editMode = false;
                init();
                Materialize.toast('Registro modificado correctamente', 5000);
            }

            function error(error) {
                console.log('Error al actualizar');
            }
        }

        function eliminar(codigo) {
            swal({
                title: 'ESTAS SEGURO?',
                text: 'Si eliminas este nodo se eliminaran las rutas asociadas a el!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9ccc65',
                cancelButtonColor: '#D50000',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                closeOnConfirm: false
            }, function (isConfirm) {
                if (isConfirm) {
                    nodosService.delete(codigo).then(success, error);
                    swal.disableButtons();
                }
                function success(p) {
                    setTimeout(function () {
                        swal({
                            title: 'Exito!',
                            text: 'Nodo eliminado correctamente',
                            type: 'success',
                            showCancelButton: false,
                        }, function () {
                            init();
                        });
                    }, 1000);
                }
                function error(error) {
                    swal({
                        title: 'Error!',
                        text: 'No se pudo eliminar el nodo',
                        type: 'error',
                        showCancelButton: false,
                    }, function () {
                    });
                };
            });
        }

        function nuevaRuta(nodo_origen) {
            vm.ruta = {}
            vm.nodo = nodo_origen;
            vm.ruta.id_nodo_origen = nodo_origen.id;
            vm.nombreForm = "Nueva ruta";
            vm.active = "active";
            vm.editMode = false;
            $("#modalRutas").openModal();
        }
        
        function guardarRuta() {
            vm.ruta.id_nodo_destino = vm.nodo_destino.id;
            vm.ruta.f_objetivo = ((vm.ruta.distancia*0.01)+(vm.ruta.tiempo*0.01)+(vm.ruta.cantidad_peajes)+(vm.ruta.estado_via)+(vm.ruta.tipo_via)+(vm.ruta.condiciones_via)+(vm.ruta.seguridad_via));
            nodosService.postRuta(vm.ruta).then(success, error);
            function success(p) {
                $("#modalRutas").closeModal();
                Materialize.toast('Ruta creada correctamente', 5000);
            }
            function error(error) {
                console.log('Error al guardar');
            }
        }

    }
})();