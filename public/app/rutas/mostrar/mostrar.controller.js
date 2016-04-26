(function() {
    'use strict';

    angular
        .module('app.rutas.mostrar')
        .controller('mostrarController', mostrarController);

    function mostrarController(rutasService) {
        var vm = this;
        vm.nodo = {};
        vm.ruta = {};
        vm.editMode = false;
        vm.nombreForm = "";
        vm.active = "";

        //funciones
        vm.actualizar = actualizar;
        vm.update = update;
        vm.eliminar = eliminar;
        
        init();
        function init() {
            vm.rutas = [];
            loadRutas();
        }

        function loadRutas() {
            rutasService.getAll().then(success, error);
            function success(p) {
                for (var i = 0; i < p.data.length; i++){
                    if(p.data[i].rutas != 0){
                        vm.rutas.push(p.data[i]);
                    }
                }
                console.log(vm.rutas)
            }

            function error(error) {
                console.log('Error al cargar datos');
            }
        }

        function guardar() {
            rutasService.post(vm.nodo).then(success, error);
            function success(p) {
                $("#modalNuevoNodo").closeModal();
                init();
                Materialize.toast('Registro guardado correctamente', 5000);
            }

            function error(error) {
                console.log('Error al guardar');
            }
        }

        function actualizar(ruta) {
            vm.ruta = ruta;
            vm.editMode = true;
            vm.nombreForm = "Modificar ruta";
            vm.active = "active";
            $("#modalNuevoNodo").openModal();
        }


        function update() {
            rutasService.put(vm.ruta, vm.ruta.id).then(success, error);
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
                text: 'Si eliminas este ruta se eliminaran las rutas asociadas a el!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#9ccc65',
                cancelButtonColor: '#D50000',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                closeOnConfirm: false
            }, function (isConfirm) {
                if (isConfirm) {
                    rutasService.delete(codigo).then(success, error);
                    swal.disableButtons();
                }
                function success(p) {
                    setTimeout(function () {
                        swal({
                            title: 'Exito!',
                            text: 'Ruta eliminado correctamente',
                            type: 'success',
                            showCancelButton: false,
                        }, function () {
                            init();
                        });
                    }, 2000);
                }
                function error(error) {
                    swal({
                        title: 'Error!',
                        text: 'No se pudo eliminar el ruta',
                        type: 'error',
                        showCancelButton: false,
                    }, function () {
                    });
                };
            });
        }

        function nuevaRuta(ruta_origen) {
            vm.ruta = {}
            vm.ruta = ruta_origen;
            vm.ruta.id_ruta_origen = ruta_origen.id;
            vm.nombreForm = "Nueva ruta";
            vm.active = "active";
            vm.editMode = false;
            $("#modalRutas").openModal();
        }
        
        function guardarRuta() {
            vm.ruta.id_ruta_destino = vm.ruta_destino.id;

            rutasService.postRuta(vm.ruta).then(success, error);
            function success(p) {
                $("#modalRutas").closeModal();
                init();
                Materialize.toast('Ruta creada correctamente', 5000);
            }
            function error(error) {
                console.log('Error al guardar');
            }
        }

    }
})();