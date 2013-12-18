angular.module("globalControllers", [])

.controller('PortalCancelController',['$scope',function($scope){
	$scope.portalCancel = function(){
		sessionStorage.clear();
		window.location.replace("/");
	};
}])

