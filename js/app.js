'use strict';


// Declare app level module which depends on filters, and services
angular.module('ma1', ['ma1.filters', 'ma1.services', 'ma1.directives','ma1.controllers','ma1.mongolab'])

/*
* Configuració Route de l'aplicació. 
* Segons la url assignem un controlador i un template.
* OO: $routeProvider.
*/
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/codiusuari', {templateUrl: 'js/views/codiusuari.html', controller: 'Control1'});
    $routeProvider.when('/view2', {templateUrl: 'js/views/partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/'});
  }])

  /*
  *	Factorias i servicios: son pequeñas "fabricas" de funciones i 
  * objetos para inyectar despues en los controladores
  *
  */
  
  //factoria para guardar y eliminar sesiones con sessionStorage
.factory("sesionesControl", function(){
    return {
        //obtenemos una sesión //getter
        get : function(key) {
            return sessionStorage.getItem(key)
        },
        //creamos una sesión //setter
        set : function(key, val) {
            return sessionStorage.setItem(key, val)
        },
        //limpiamos una sesión
        unset : function(key) {
            return sessionStorage.removeItem(key)
        }
    }
})