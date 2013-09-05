'use strict';

/* Controllers 
*
* http://www.tinet.cat/portal/signuprequest-check.do?callback=JSON_CALLBACK
*
*/

angular.module('ma1.controllers', [])
 
  .controller('Control1', function($scope, $http) {
		$scope.usuari ="Controller-> Control1";
		
		$scope.btnclic =  function() {

			var codiuser ="mramos";
			var captcha = $scope.captcha;
			var verify ="usercode";
			
			
			var url = 'https://gdata.youtube.com/feeds/api/users/orbitalofficial/uploads?alt=json-in-script&callback=JSON_CALLBACK';
			var url1 = 'http://www.tinet.cat/portal/signuprequest-check.do'; 
			
			
			$http.jsonp(url1,{ params:{ callback: 'JSON_CALLBACK', usercode:codiuser, captcha:captcha, verify:verify , contentType: 'application/json',crossDomain: true}
								})
			.success(function(data) {
				//$scope.results = data.feed.entry;
				$scope.results = data;
			})
			.error(function(data, status, headers, config) {
                $scope.results ="hola";
				//$scope.results = data;
			
				console.log(data);
				
            });
			
		};// fin btnclick
		
  })
  
  //Controller skills (intro).
  .controller('Control2', function($scope,Skills) {
		$scope.skills = Skills.query();
		
  })
  
  
  
  
  .controller('Fecha', function($scope) {
    $scope.v = new Date();
  });