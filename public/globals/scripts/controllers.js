angular.module("globalControllers", [])

.controller('PortalCancelController',['$scope',function($scope){
	$scope.portalCancel = function(){
		window.location.replace("/");
	};
}])

