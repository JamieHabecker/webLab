angular.module("globalControllers", [])

		.controller('PortalCancelController',['$scope', function($scope){
			$scope.portalCancel = function(){
				window.location.replace("/");
			};
		}])


		.controller('ReturnController',['$scope','$location', function($scope, $location){
			$scope.returnTo = function(){
				$location.path('/Verify')
			};
		}])