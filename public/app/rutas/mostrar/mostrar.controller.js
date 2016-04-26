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
            vm.ruta = {}
            vm.ruta = ruta;
            vm.nombreForm = "Ver ruta "+ ruta.id;
            vm.active = "active";
            vm.editMode = false;
            $("#modalRutasM").openModal();
        }


        function eliminar(codigo) {
            swal({
                title: 'ESTAS SEGURO?',
                text: 'Eliminaras esta ruta?',
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
                    }, 1000);
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