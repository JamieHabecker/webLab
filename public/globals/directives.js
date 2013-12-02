angular.module("globals", ['globalFactories', 'globalControllers'])


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


.directive('btn', function(){
			return{
			restrict: 'A',
			template: '<button data-ng-disabled="form.$invalid" data-ng-click="next()"> Continue</button>',
			replace: true
			}
	})

.directive('year', function(){
			return{
				restrict: 'A',
				template: "<label>Year<span class='reqText'>Required</span></label><input type='text' name='theyear' data-ng-model='theyear' data-ng-pattern='yearR' required='true' placeholder='YYYY'>" +
						"<p data-ng-show='form.theyear.$invalid && form.theyear.$dirty'>You must enter the vehicles year</p>",
				link: function(scope){
				//scope.vinR= /^(\d){4}$/;
				scope.yearR= /^(19|20)\d{2}$/;
				//scope.textR= /^[a-zA-Z]+$/;
				},
			}
})

.directive('vin', function(){
			return{
				restrict: 'A',
				template: "<label>Last Four of VIN<span class='reqText'>Required</span></label><input type='text' name='thevin' data-ng-model='thevin' data-ng-pattern='vinR' required='true' placeholder='VIN'>" +
						"<p data-ng-show='form.thevin.$invalid && form.thevin.$dirty'>You must enter the last four VIN</p>",
				link: function(scope){
					scope.vinR= /^(\d){4}$/;
					//scope.textR= /^[a-zA-Z]+$/;
				},
			}
		})

.directive('return', function(){
			return{
				restrict: 'A',
				template:'<nav data-ng-show="rt" data-ng-controller="ReturnController">' +
						'<a data-ng-click="returnTo();next()"> Return to Summary</a></nav>',
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
		})