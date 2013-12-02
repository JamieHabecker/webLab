angular.module("globals", ['globalFactories', 'globalControllers'])


.directive('states',['StateFactory',function(StateFactory){
			return{
				restrict: "A",
				template: "<label>State<span class='reqText'>Required</label><select data-ng-model='state' data-ng-click='setState()' data-ng-options='c.State for c in states'>" +
						"<option value=''>{{current}}</option></select>",
				link: function(scope, elm, attrs){
					StateFactory.menu({},{}, statescb, stateserr);
					function statescb(data){
						scope.current="Select a State"
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
				template: "<label>Year<span class='reqText'>Required</span></label><input type='text' name='vyear' data-ng-model='vyear' data-ng-pattern='vyearR' required='true' placeholder='YYYY'>" +
						"<p data-ng-show='form.vyear.$invalid && form.vyear.$dirty'>You must enter the vehicles year</p>",
				link: function(scope){
				scope.vyearR= /^(19|20)\d{2}$/;
				}
			}
})

.directive('plate', function(){
			return{
				restrict: 'A',
				template: "<label>Plate<span class='reqText'>Required</span></label><input type='text' name='vplate' data-ng-model='vplate' data-ng-maxlength='8' required='true' placeholder='License Plate'>" +
						"<p data-ng-show='form.vplate.$invalid && form.vplate.$dirty'>You must enter the vehicles license plate</p>",
			}
})

.directive('prmcolr', function(){
			return{
				restrict: 'A',
				template: "<label>Primary Color<span class='reqText'>Required</span></label><input type='text' name='vprmcolr' data-ng-model='vprmcolr' data-ng-required='true' placeholder='Primary Color'>" +
						"<p data-ng-show='form.vprmcolr.$invalid && form.vprmcolr.$dirty'>You must enter the vehicles primary color</p>"
			}
})

.directive('seccolr', function(){
			return{
				restrict: 'A',
				scope:{
					req: "="
				},
				template: "<label>Secondary Color<span class='reqText' data-ng-show='req'>Required</span></label><input type='text' name='vseccolr' data-ng-model='vseccolr' data-ng-required='req' placeholder='Secondary Color'>" +
						"<p data-ng-show='form.vseccolr.$invalid && form.vseccolr.$dirty'>You must enter the vehicles secondary color</p>",
			link: function(scope){
				scope.req= scope.req;
			}
			}
})

.directive('model', function(){
			return{
				restrict: 'A',
				scope:{
					req : "="
				},
				template: "<label>Model<span class='reqText' data-ng-show='req'>Required</span></label><input type='text' data-ng-required='req' name='vmodel' data-ng-model='vmodel' placeholder='Model'>" +
						"<p data-ng-show='form.vmodel.$invalid && form.vmodel.$dirty'>You must enter the vehicles model</p>",
				link: function(scope){
					scope.req= scope.req;
				}
			}
})

.directive('make', function(){
			return{
				restrict: 'A',
				scope:{
					req : "="
				},
				template: "<label>Make<span class='reqText' data-ng-show='req'>Required</span></label><input type='text' data-ng-required='req' name='vmake' data-ng-model='vmake' placeholder='Make'>" +
						"<p data-ng-show='form.vmake.$invalid && form.vmake.$dirty'>You must enter the vehicles model</p>",
				link: function(scope){
					scope.req= scope.req;
				}
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
				}
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