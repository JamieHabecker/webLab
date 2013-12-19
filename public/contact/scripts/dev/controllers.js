angular.module("KnowledgePortal",['ngResource','directives','globals','factories']).value('$anchorScroll', angular.noop)

.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider, $httpProvider){
			$httpProvider.defaults.headers.get = {
				'Accept' : 'application/json, text/javascript, */*'
			};
			$routeProvider
					.when('/ContactUs', {
						controller : 'StepOneController',
						templateUrl : 'views/stepOne.html'
					})
					.when('/StepTwo', {
						controller : 'StepTwoController',
						templateUrl : 'views/stepTwo.html'
					})
					.when('/Verify', {
						controller : 'VerifyController',
						templateUrl : 'views/confirmation.html'
					})
					.when('/Complete', {
						controller : 'CompleteController',
						templateUrl : 'views/complete.html'
					})
					.otherwise({
						redirectTo : '/ContactUs'
					});
}])

.controller('StepOneController', ['$scope','$location','$timeout', function($scope, $location, $timeout){
			var stepOne = sessionStorage.stepOne;
			var vehicleInfo= sessionStorage.vehicleInfo;
			var complete= sessionStorage.complete;
			sessionStorage.removeItem('vehicles');
			if(stepOne !== undefined){
				var one = sessionStorage.getItem('stepOne');
				var cdOne = JSON.parse(one);
				var formFill = {
					fillIt : function() {
						$scope.email = cdOne.email;
						$scope.fn  = cdOne.firstname;
						$scope.lastname  = cdOne.lastname;
						$scope.phone  = cdOne.phone;
						$scope.subject = cdOne.subject;
						$scope.customernumber= cdOne.custnumber;
					}
				};
				$timeout(formFill.fillIt, 100);
			}
			$scope.setText = function(x){
				var s = $("#sub option[value='" +  x + "']").text();
				sessionStorage.subj = s;
			};
			$scope.next = function(){
				_gaq.push(['_trackEvent', 'NEW Contact Form Started!', 'ContactUs']);
				var stepOne = {
					firstname : $scope.fn,
					lastname : $scope.lastname,
					phone : $scope.phone,
					email : $scope.email,
					subject : $scope.subject,
					custnumber: $scope.customernumber
				};
				if($scope.subject === "vi"){
					sessionStorage.vehicles = true;
				}else{
					sessionStorage.removeItem("vehicleInfo");
					sessionStorage.removeItem("vehicles")
				}
				if($scope.subject === "vi" && complete && vehicleInfo === undefined){
					sessionStorage.removeItem("complete");
				}
				sessionStorage.setItem('stepOne', JSON.stringify(stepOne));
				if(sessionStorage.complete){
					$location.path('/Verify')
				}else{
					$location.path("/StepTwo");
				}
			}
}])

.controller('StepTwoController', ['$scope','$location','$timeout', function($scope, $location, $timeout){
			var stepOne= sessionStorage.stepOne;
			var vehicles= sessionStorage.vehicles;
			var vehicleInfo= sessionStorage.vehicleInfo;
			var description= sessionStorage.description;
			if(stepOne === undefined){
				$location.path("/StepOne");
			}
			if(vehicles){
				$scope.vehicles = true;
			}
			if(vehicleInfo !== undefined && description !== undefined){
				var two = sessionStorage.getItem('vehicleInfo');
				var cdTwo = JSON.parse(two);
				var formFill = {
				fillIt : function() {
					$scope.details = sessionStorage.description;
					$scope.title = cdTwo.title;
					$scope.vvin = cdTwo.vin;
					$scope.vplate = cdTwo.plate;
					}
				}
				$timeout(formFill.fillIt, 100);
			}else if(vehicleInfo === undefined && description){
				var formFill = {
				fillIt : function() {
					$scope.details = sessionStorage.description;
				}
				}
				$timeout(formFill.fillIt, 100);
			}
			$scope.next = function(){
				if(vehicles){
					var vehicleInfo = {
						title : $scope.title,
						vin : $scope.vvin,
						plate : $scope.vplate
					}
					sessionStorage.setItem('vehicleInfo', JSON.stringify(vehicleInfo));
				}
				sessionStorage.custnumber= $scope.customernumber;
				sessionStorage.description= $scope.details;
				$location.path("/Verify")
			};
			$scope.back = function() {
				$location.path("/StepOne")
			};
}])

.controller('VerifyController',['$scope','$location','ContactFactory', function($scope, $location, ContactFactory){
			var one;
			var vehicles= sessionStorage.vehicles;
			var vehicleInfo= sessionStorage.vehicleInfo;
			var stepOne= sessionStorage.stepOne;
			var description= sessionStorage.description;
			var subject= sessionStorage.subj;
			var two;
			var cdOne;
			var cdTwo;
			var data={};
			$scope.dis= true;
			$scope.verify = true;
			sessionStorage.complete = "yes";
			if(vehicles){
				$scope.vehicles= true;
				$scope.vary= "sing"
			}else{
				$scope.vary= "sec"
			}
			if(!stepOne && !description){
				$location.path("/StepOne");
			}else{
				one = sessionStorage.getItem('stepOne');
				cdOne = JSON.parse(one);
				data = {
					firstname  : cdOne.firstname,
					lastname  : cdOne.lastname,
					phone  : cdOne.phone,
					email : cdOne.email,
					subject : cdOne.subject,
					realSubject : subject,
					custnumber : cdOne.custnumber,
					description : sessionStorage.description
				};
				if(vehicleInfo){
					two = sessionStorage.getItem('vehicleInfo');
					cdTwo = JSON.parse(two);
					data.title = cdTwo.title;
					data.vin= cdTwo.vin;
					data.plate= cdTwo.plate;
				}
				if(cdOne.subject === 'ot'){
					data.realSubject = undefined;
				}
				if(cdOne.phone !== undefined && cdOne.phone.indexOf('555555') !==-1){
					data.phone = undefined;
				}
				$scope.subj= subject;
				$scope.mail = data.email;
				$scope.theData = [data];
				var DTO ={
					"oContactUsFields":data
				};
				$scope.addResponse = function(x) {
					data.response = x;
					$scope.dis= false;
				};
				}
			$scope.edit = function(x){
				$location.path('/' + x)
			}
			$scope.next = function(){
			$scope.isloading = true;
			sessionStorage.setItem('data', JSON.stringify(data));
			ContactFactory.contactInfo({}, DTO, successcb, errorcb);
		};
			function successcb(data){
				$scope.verify = false;
				$location.path('/Complete');
			}
			function errorcb(data){
				$scope.err = data.status
			}
}])

.controller('CompleteController',['$scope','$location','$timeout', function($scope, $location, $timeout){
			var data= sessionStorage.data;
			var theData;
			var formFill;
			if(data === undefined){
				$location.path("/ContactUs");
			}else{
				theData = sessionStorage.getItem('data');
				data = JSON.parse(theData);
				$scope.theData = [data];
				_gaq.push(['_trackEvent', 'Contact Form Completed!', 'ContactUs']);
				formFill = {
					fillIt : function() {
					sessionStorage.clear();
					}
				}
				$timeout(formFill.fillIt, 1500);
			}
			$scope.next = function(){
				window.location.replace("/");
			}
}])