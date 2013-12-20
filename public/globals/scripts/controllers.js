angular.module("globalControllers", [])

.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider, $httpProvider){
			$httpProvider.defaults.headers.get = {
				'Accept' : 'application/json, text/javascript, */*'
			};
			$routeProvider
					.when('/Error', {
						controller: 'ErrorController',
						templateUrl : 'views/error.html'
					})
		}])



.controller('PortalCancelController',['$scope',function($scope){
	$scope.portalCancel = function(){
		sessionStorage.clear();
		window.location.replace("/");
	};
}])

.controller('ErrorController', ['$scope', function($scope){
			var err= sessionStorage.err;
			if(err=== "500"){
				$scope.error= "Sorry, our server is currently unavailable. Please try again later."
			}
			if(err=== "404"){
				$scope.error= "Sorry, the requested page could not be found. Please check the URL and try again."
			}
			$scope.next= function(){
				window.location.replace("/");
			}
}])

