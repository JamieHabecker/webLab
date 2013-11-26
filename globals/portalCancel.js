angular.module("portalCancel", [])

.controller('PortalCancelController',['$scope', function($scope){
	$scope.portalCancel = function(){
		window.location.replace("/");
	};
}])

.directive('portalcancel', function(){
	return{
		restrict: 'E',
			template:'<nav class="portalCancel" ng-controller="PortalCancelController">' +
			'<a ng-click="portalCancel()">Cancel</a></nav>',
			replace: true 
		};
})