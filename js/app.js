'use strict';


// Declare app level module which depends on filters, and services
angular.module('ma1', ['ma1.filters', 'ma1.services', 'ma1.directives','ma1.controllers','ma1.mongolab'])

/*
* Configuraci� Route de l'aplicaci�. 
* Segons la url assignem un controlador i un template.
* OO: $routeProvider.
*/
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/codiusuari', {templateUrl: 'js/views/codiusuari.html', controller: 'Control1'});
    $routeProvider.when('/view2', {templateUrl: 'js/views/partials/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/'});
  }])

  /*
  *	Factorias i servicios: son peque�as "fabricas" de funciones i 
  * objetos para inyectar despues en los controladores
  *
  */
  
  //factoria para guardar y eliminar sesiones con sessionStorage
.factory("sesionesControl", function(){
    return {
        //obtenemos una sesi�n //getter
        get : function(key) {
            return sessionStorage.getItem(key)
        },
        //creamos una sesi�n //setter
        set : function(key, val) {
            return sessionStorage.setItem(key, val)
        },
        //limpiamos una sesi�n
        unset : function(key) {
            return sessionStorage.removeItem(key)
        }
    }
})