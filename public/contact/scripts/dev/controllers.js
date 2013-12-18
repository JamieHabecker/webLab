angular.module("KnowledgePortal", ['ngResource','directives','dmvPortalConfig','globals', 'factories'])//.value('$anchorScroll', angular.noop)

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
	sessionStorage.removeItem('vehicles');
	sessionStorage.removeItem('drivers');
	if(sessionStorage.stepOne){
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
				_gaq.push(['_trackEvent', 'Contact Form Started!', 'ContactUs']);
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
					sessionStorage.removeItem("complete");
				}else if($scope.subject !== "vi" && sessionStorage.vehicleInfo){
					sessionStorage.removeItem("vehicleInfo")
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
			if(!sessionStorage.stepOne){
				$location.path("/StepOne");
			}
			if(sessionStorage.vehicles){
				$scope.vehicles = true;
			}



			if(sessionStorage.vehicleInfo && sessionStorage.description){
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
			}else if(!sessionStorage.vehicleInfo && sessionStorage.description){
				var formFill = {
				fillIt : function() {
					$scope.details = sessionStorage.description;
				}
				}
				$timeout(formFill.fillIt, 100);
			}else{

			}










			$scope.next = function(){
				var vehicleInfo = {
					title : $scope.title,
					vin : $scope.vvin,
					plate : $scope.vplate
				};
				sessionStorage.custnumber= $scope.customernumber;
				sessionStorage.description= $scope.details;
				sessionStorage.setItem('vehicleInfo', JSON.stringify(vehicleInfo));
				$location.path("/Verify")
			};
			$scope.back = function() {
				$location.path("/StepOne")
			};
}])

.controller('VerifyController',['$scope','$location','ContactFactory', function($scope, $location, ContactFactory){
			var one;
			var two;
			var cdOne;
			var cdTwo;
			var data={};
			$scope.dis= true;
			$scope.verify = true;
			sessionStorage.complete = "yes";
			if(sessionStorage.vehicles){
				$scope.vehicles= true;
				$scope.vary= "sing"
			}else{
				$scope.vary= "sec"
			}
			if(!sessionStorage.stepOne && !sessionStorage.stepTwo){
				$location.path("/StepOne");
			}else{
				one = sessionStorage.getItem('stepOne');
				cdOne = JSON.parse(one);
				data = {
					firstname  : cdOne.firstname,
					lastname  : cdOne.lastname,
					phone  : cdOne.phone,
					email : cdOne.email,
					suffix : cdOne.suffix,
					subject : cdOne.subject,
					realSubject : sessionStorage.subj,
					custnumber : cdOne.custnumber,
					description : sessionStorage.description
				};
				if(sessionStorage.vehicleInfo){
					two = sessionStorage.getItem('vehicleInfo');
					cdTwo = JSON.parse(two);
					data.title = cdTwo.title;
					data.vin= cdTwo.vin;
					data.plate= cdTwo.plate;
				}else{
				}
			if(cdOne.subject === 'ot'){
				data.realSubject = undefined;
			}
			if(cdOne.phone !== undefined && cdOne.phone.indexOf('555555') !==-1){
				data.phone = undefined;
			}
				$scope.subj = sessionStorage.subj;
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
				console.log(x)
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
			var theData;
			var formFill;
			if(!sessionStorage.stepOne && !sessionStorage.stepTwo && !sessionStorage.data){
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