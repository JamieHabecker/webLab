angular.module("salvageComplaint", ['ngResource','globals','ui.date','factories'])//.value('$anchorScroll', angular.noop)

.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider, $httpProvider){
	$httpProvider.defaults.headers.get = {
		'Accept' : 'application/json, text/javascript, */*'
	};
	$routeProvider
	.when('/', {
		controller : 'DisclaimerController',
		templateUrl : 'views/disclaimer.html'
	})
	.when('/StepOne', {
		controller : 'StepOneController',
		templateUrl : 'views/stepOne.html'
	})
	.when('/StepTwo', {
		controller : 'StepTwoController',
		templateUrl : 'views/stepTwo.html'
	})
	.when('/StepThree', {
		controller : 'StepThreeController',
		templateUrl : 'views/stepThree.html'
	})
	.when('/StepFour', {
		controller : 'StepFourController',
		templateUrl : 'views/stepFour.html'
	})
	.when('/StepFive', {
		controller : 'StepFiveController',
		templateUrl : 'views/stepFive.html'
	})
	.when('/StepSix', {
		controller : 'StepSixController',
		templateUrl : 'views/stepSix.html'
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
		redirectTo : '/'
	});

}])

.controller('DisclaimerController', ['$scope','$location', function($scope, $location){
	sessionStorage.clear();
	$scope.next = function(){
		$location.path('/StepOne')
	}
}])

.controller('StepOneController', ['$scope','$location', function($scope, $location){
			var anonymous= sessionStorage.anonymous;
			if(anonymous === undefined){
				$scope.checkIt = true;
			}else if(anonymous === "Yes"){
				$scope.anonymous = "Yes";
			}else{
				$scope.anonymous = "No";
			}
			$scope.one= function(){
				sessionStorage.anonymous = "Yes";
				$scope.checkIt = false;
			}
			$scope.two= function(){
				sessionStorage.anonymous = "No";
				$scope.checkIt = false;
			}
			$scope.next= function(){
				if($scope.anonymous === "No"){
				$location.path("/StepTwo")
			}else{
				$location.path("/StepFour")
		}
	}
}])

.controller('StepTwoController', ['$scope','$location','$timeout', function($scope, $location, $timeout){
			var anonymous= sessionStorage.anonymous;
			var stepTwo= sessionStorage.stepTwo;
			var current= sessionStorage.statetwo;
			var stateCode= sessionStorage.stateCodetwo;
			if(anonymous === undefined){
				$location.path("/StepOne")
			}
	 		if(stepTwo){
	 			var data = sessionStorage.getItem('stepTwo');
	 			var p = JSON.parse(data);
	 			var formFill = {
	 				fillIt : function() {
	 					$scope.fn= p.firstname;
	 					$scope.lastname  = p.lastname;
	 					$scope.address  = p.address;
	 					$scope.city  = p.city;
	 					$scope.zip = p.zip
						$scope.current= current;
	 				}
	 			};
	 			$timeout(formFill.fillIt, 100);
			 }
			$scope.next= function(){
				var stepTwo = {
					firstname : $scope.fn,
					lastname : $scope.lastname,
					address : $scope.address,
					city: $scope.city,
					state: current,
					stateCode: stateCode,
					zip: $scope.zip
				};
				sessionStorage.setItem('stepTwo', JSON.stringify(stepTwo));
				$location.path("/StepThree")
			}
}])

.controller('StepThreeController', ['$scope','$location','$timeout', function($scope, $location, $timeout){
			var stepTwo= sessionStorage.stepTwo;
			var stepThree= sessionStorage.stepThree;
			var complete= sessionStorage.complete;
			if(stepTwo === undefined){
				//$location.path("/")
			}
			if(stepThree){
	 			var data = sessionStorage.getItem('stepThree');
	 			var p = JSON.parse(data);
	 			var formFill = {
	 				fillIt : function() {
	 					$scope.email= p.email;
	 					$scope.phone = p.phone;
	 					$scope.conPref  = p.conPref;
	 				}
	 			};
	 			$timeout(formFill.fillIt, 100);
			}
			$scope.next= function(){
				var stepThree = {
					email : $scope.email,
					phone : $scope.phone,
					conPref : $scope.conPref
				};
				sessionStorage.setItem('stepThree', JSON.stringify(stepThree));
				if(complete){
					$location.path("/Verify")
				}else{
					$location.path("/StepFour")
				}
			}
}])

.controller('StepFourController', ['$scope','$location','$timeout', function($scope, $location,$timeout){
			var stepFour= sessionStorage.stepFour;
			var state= sessionStorage.stateFour;
			var stateCode= sessionStorage.stateCodefour;
			var complete= sessionStorage.complete;
			var anonymous= sessionStorage.anonymous;
			if(stepFour){
				var data = sessionStorage.getItem('stepFour');
				var p = JSON.parse(data);
				var formFill = {
					fillIt : function() {
						$scope.compName= p.compName;
						$scope.address = p.address;
						$scope.city  = p.city;
						$scope.zip = p.zip;
						$scope.email = p.email;
						$scope.phone = p.phone;
					}
				};
				$timeout(formFill.fillIt, 100);
			}
			$scope.next= function(){
				var stepFour = {
					compName : $scope.compName,
					address : $scope.address,
					city : $scope.city,
					zip : $scope.zip,
					state: state,
					stateCode: stateCode,
					email : $scope.email,
					phone : $scope.phone
				};
				sessionStorage.setItem('stepFour', JSON.stringify(stepFour));
				if(complete){
					$location.path("/Verify")
				}else{
					$location.path("/StepFive")
				}
			}
}])

.controller('StepFiveController', ['$scope','$location','$timeout','$filter',function($scope, $location,$timeout,$filter){
			var stepFour= sessionStorage.stepFour;
			var stepFive= sessionStorage.stepFive;
			var complete= sessionStorage.complete;
			if(stepFour === undefined){
				$location.path("/");
			}
			if(stepFive){
				var data = sessionStorage.getItem('stepFive');
				var p = JSON.parse(data);
				var a= p.complDate;
				var b= $filter('date')(a,'longDate')
				var formFill = {
					fillIt : function() {
						$scope.vyear= p.year;
						$scope.vmake= p.make;
						$scope.vmodel= p.model;
						$scope.vvin= p.vin;
						$scope.vplate= p.plate;
						$scope.date= b;
					}
				};
				$timeout(formFill.fillIt, 500);
			}
			$scope.next= function(){
				var a= $scope.date;
				var b= $filter('date')(a,'longDate')
				var stepFive = {
					year: $scope.vyear,
					make: $scope.vmake,
					model: $scope.vmodel,
					vin : $scope.vvin,
					plate: $scope.vplate,
					complDate: b
				}
				sessionStorage.setItem('stepFive', JSON.stringify(stepFive));
				if(complete){
					$location.path("/Verify")
				}else{
					$location.path('/StepSix')
				}
			}
}])

.controller('StepSixController', ['$scope','$location','$timeout', function($scope, $location,$timeout){
			var stepFour= sessionStorage.stepFour;
			var stepSix= sessionStorage.stepSix;
			if(stepFour === undefined){
				$location.path("/");
			}
			if(stepSix){
				var data = sessionStorage.getItem('stepSix');
				var p = JSON.parse(data);
				var formFill = {
					fillIt : function() {
						$scope.details= p.details;
					}
				};
				$timeout(formFill.fillIt, 100);
			}
			$scope.next= function(){
				var stepSix = {
					details : $scope.details
				};
				sessionStorage.setItem('stepSix', JSON.stringify(stepSix));
				$location.path('/Verify')
			}
}])

.controller('VerifyController', ['$scope','$location','ContactFactory', function($scope,$location,ContactFactory){
			var stepTwo= sessionStorage.stepTwo;
			var stepThree= sessionStorage.stepThree;
			var stepFour= sessionStorage.stepFour;
			var stepFive= sessionStorage.stepFive;
			var stepSix= sessionStorage.stepSix;
			var state= sessionStorage.stateCodetwo;
			var compStateCode= sessionStorage.stateCodefour;
			var anonymous= sessionStorage.anonymous;
			if(stepSix === undefined){
				$location.path('/')
			}
			if(stepSix){
				cdFour = JSON.parse(stepFour);
				cdSix = JSON.parse(stepSix);
				cdFive = JSON.parse(stepFive);
				if(anonymous === "No"){
					cdTwo = JSON.parse(stepTwo);
					cdThree = JSON.parse(stepThree);
					data = {
						pc: "true",
						firstname  : cdTwo.firstname,
						lastname  : cdTwo.lastname,
						address  : cdTwo.address,
						city : cdTwo.city,
						zip : cdTwo.zip,
						state: state,
						email : cdThree.email,
						phone : cdThree.phone,
						conPref : cdThree.conPref,
						compName : cdFour.compName,
						compAddress: cdFour.address,
						compCity: cdFour.city,
						compState: compStateCode,
						compZip: cdFour.zip,
						compEmail: cdFour.email,
						compPhone: cdFour.phone,
						year: cdFive.year,
						make: cdFive.make,
						model: cdFive.model,
						vin: cdFive.vin,
						plate: cdFive.plate,
						complDate: cdFive.complDate,
						learned: sessionStorage.optslearned,
						details: cdSix.details
					};
					$scope.theData = [data];
				}else{
					$scope.vary= "gen";
					$scope.vary2= "sec";
					$scope.vary3= "sing";
					data = {
						pc: "false",
						compName : cdFour.compName,
						compAddress: cdFour.address,
						compCity: cdFour.city,
						compState: compStateCode,
						compZip: cdFour.zip,
						compEmail: cdFour.email,
						compPhone: cdFour.phone,
						details: cdSix.details,
						year: cdFive.year,
						make: cdFive.make,
						model: cdFive.model,
						vin: cdFive.vin,
						plate: cdFive.plate,
						complDate: cdFive.complDate,
						learned: sessionStorage.optslearned
					};
					$scope.theData = [data];
				}
			}else{
				sessionStorage.clear();
				$location.path('/')
			}
			$scope.edit = function(x){
				sessionStorage.complete = "yes";
				$location.path('/' + x)
			}
			console.log(cdFive.complDate)
			$scope.next= function(){
				$scope.isloading = true;
				var DTO ={
					"oSalvageFields": data
				};
					sessionStorage.setItem('data', JSON.stringify(data));
					ContactFactory.contactInfo({}, DTO, successcb, errorcb);
			}
			function successcb(data){
				sessionStorage.refNumber = data.ComplaintId
				$location.path('/Complete')
			}
			function errorcb(data){
				$scope.err = data.status
			}
}])

.controller('CompleteController', ['$scope','complete', function($scope, complete){
			$scope.ref= "[#" + sessionStorage.refNumber + "]";
			sessionStorage.clear();
			$scope.next = function(){
				window.location.replace("/");
			}
}])




//var limit = 1024 * 1024 * 5; // 5 MB
//var remSpace = limit - unescape(encodeURIComponent(JSON.stringify(sessionStorage))).length;
//console.log(remSpace)