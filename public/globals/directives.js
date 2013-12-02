angular.module("globals", ['globalFactories'])

.directive('states',['StateFactory',function(StateFactory){
			return{
				restrict: "A",
				template: "<label>State<span class='reqText'>Required</label><select data-ng-model='state' data-ng-click='setState()' data-ng-options='c.State for c in states'>" +
						"<option value=''>{{current}}</option></select>",
				link: function(scope, elm, attrs){
					StateFactory.menu({},{}, statescb, stateserr);
					function statescb(data){
						scope.states = data;
					}
					function stateserr(err){
						console.log(err)
					}
				}
			};
		}])

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


.directive('return', function(){
			return{
				restrict: 'A',
				template:'<nav data-ng-show="rt" data-ng-controller="ReturnController">' +
						'<a data-ng-click="returnTo()"> Return to Summary</a></nav>',
				replace: true
			};
		})

.directive('portalcancel', function(){
			return{
				restrict: 'E',
				template:'<nav class="portalCancel" ng-controller="PortalCancelController">' +
						'<a ng-click="portalCancel()">Cancel</a></nav>',
				replace: true
			};
		});


