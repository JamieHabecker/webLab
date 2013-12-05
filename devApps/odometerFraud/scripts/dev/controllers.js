angular.module("odomFraud", ['ngResource','directives','dmvPortalConfig','globals','factories'])//.value('$anchorScroll', angular.noop)

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

.controller('DisclaimerController', ['$scope','$location','complete', function($scope, $location,complete){
	$scope.next = function(){
		$location.path('/StepOne')
	}
}])

.controller('StepOneController', ['$scope','$location','complete', function($scope, $location,complete){
	if(sessionStorage.type){
		var a = sessionStorage.type;
			if(a === "1"){
				$scope.comType = "1";
			}else{
				$scope.comType = "2";
			}
		$scope.checkIt = false;
	}else{
		$scope.checkIt = true;
	}
	$scope.one= function(){
		sessionStorage.type = "1";
		$scope.checkIt = false;
	}
	$scope.two= function(){
		sessionStorage.type = "2";
		$scope.checkIt = true;
	}
	$scope.check= function(){
		$scope.checkIt = false;
	}
	$scope.next= function(){
		if($scope.comType === "1" || $scope.an === "Yes"){
			sessionStorage.an = false;
			$location.path("/StepTwo")
		}else{
			sessionStorage.removeItem("an");
			$location.path("/StepFour")
		}
		
	}
}])

.controller('StepTwoController', ['$scope','$location','$timeout','complete', function($scope, $location, $timeout, complete){
	 if(sessionStorage.stepTwo){
	 	var data = sessionStorage.getItem('stepTwo');
	 	var p = JSON.parse(data);
	 	var formFill = {
	 		fillIt : function() {
	 			$scope.fn= p.firstname;
	 			$scope.lastname  = p.lastname;
	 			$scope.address  = p.address;
	 			$scope.city  = p.city;
	 			$scope.current = sessionStorage.state;
	 			$scope.zip = p.zip
	 			}
	 		};
	 	$timeout(formFill.fillIt, 100);
   }else{
		 $scope.current="Select a State";
	 }
	$scope.next= function(){
		if($scope.state !== undefined){
			sessionStorage.state = $scope.state.code;
		}else{
		}
		var stepTwo = {
			firstname : $scope.fn,
			lastname : $scope.lastname,
			address : $scope.address,
			city: $scope.city,
			zip: $scope.zip
			};
		sessionStorage.setItem('stepTwo', JSON.stringify(stepTwo));
		if(complete){
			$location.path("/Verify")
		}else{
			$location.path("/StepThree")
		}
	}
}])

.controller('StepThreeController', ['$scope','$location','$timeout','complete', function($scope, $location, $timeout, complete){
	if(sessionStorage.stepThree){
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

.controller('StepFourController', ['$scope','$location','$timeout','complete', function($scope, $location,$timeout, complete){
	$scope.zip = /^\d\d\d\d\d$/;
	$scope.email= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(sessionStorage.stepFour){
		if(sessionStorage.compState){
			$scope.current = sessionStorage.compState;
		}else{
			$scope.current = "Select a State";
		}
		var data = sessionStorage.getItem('stepFour');
		var p = JSON.parse(data);
		var formFill = {
			fillIt : function() {
				$scope.compName= p.compName;
				$scope.compAddress = p.compAddress;
				$scope.compCity  = p.compCity;
				$scope.compZip = p.compZip;
				$scope.compEmail = p.compEmail;
				$scope.compPhone = p.compPhone;
			}
			};
		$timeout(formFill.fillIt, 100);
	}else{
		$scope.current = "Select a State";
	}
	$scope.next= function(){
		console.log(complete)
		if($scope.state !== undefined){
			sessionStorage.compState = $scope.state.State;
		}
		var stepFour = {
			compName : $scope.compName,
			compAddress : $scope.compAddress,
			compCity : $scope.compCity,
			compZip : $scope.compZip,
			compEmail : $scope.compEmail,
			compPhone : $scope.compPhone
		};
		sessionStorage.setItem('stepFour', JSON.stringify(stepFour));
		if(complete){
			$location.path("/Verify")
		}else if(sessionStorage.an){
			$location.path("/StepFive")
		}else if(sessionStorage.an && complete){
			$location.path("/Verify")
		}else{
		$location.path("/StepSix")
		}
	}
}])

.controller('StepFiveController', ['$scope','$location','$timeout','complete',function($scope, $location,$timeout,complete){
	if(sessionStorage.stepFive){
		var data = sessionStorage.getItem('stepFive');
		var p = JSON.parse(data);
		var formFill = {
			fillIt : function() {
				$scope.vyear= p.year;
				$scope.vmake = p.make;
				$scope.vmodel  = p.model;
				$scope.vvin = p.vin;
				$scope.vplate = p.plate;
				$scope.vpc = p.prmColor;
				$scope.vsc = p.secColor;
			}
		};
		$timeout(formFill.fillIt, 100);
	}
	$scope.next= function(){
		var stepFive = {
			year: $scope.vyear,
			make: $scope.vmake,
			model: $scope.vmodel,
			vin : $scope.vvin,
			plate: $scope.vplate,
			prmColor: $scope.vpc,
			secColor: $scope.vsc
		}
		sessionStorage.setItem('stepFive', JSON.stringify(stepFive));
		if(complete){
			$location.path("/Verify")
		}else{
		$location.path('/StepSix')
		}
	}
}])

.controller('StepSixController', ['$scope','$location','$timeout','complete', function($scope, $location,$timeout,complete){
	if(sessionStorage.stepSix){
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
			var state = sessionStorage.state;
			var compState = sessionStorage.compState;
			var two,three,four,five,six,cdTwo,cdThree,cdFour,cdFive,cdSix;
			if(sessionStorage.stepSix){
				four = sessionStorage.getItem('stepFour');
				six = sessionStorage.getItem('stepSix');
				cdFour = JSON.parse(four);
				cdSix = JSON.parse(six);
				if(sessionStorage.an){
					two = sessionStorage.getItem('stepTwo');
					three = sessionStorage.getItem('stepThree');
					five = sessionStorage.getItem('stepFive');
					cdTwo = JSON.parse(two);
					cdThree = JSON.parse(three);
					cdFive = JSON.parse(five);
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
						compAddress: cdFour.compAddress,
						compCity: cdFour.compCity,
						compState: compState,
						compZip: cdFour.compZip,
						compEmail: cdFour.compEmail,
						compPhone: cdFour.compPhone,
						year: cdFive.year,
						make: cdFive.make,
						model: cdFive.model,
						vin: cdFive.vin,
						plate: cdFive.plate,
						prmColor: cdFive.prmColor,
						secColor: cdFive.secColor,
						details: cdSix.details
					};
					$scope.theData = [data];
					console.log($scope.theData)
				}else{
					data = {
						pc: "false",
						compName : cdFour.compName,
						compAddress: cdFour.compAddress,
						compCity: cdFour.compCity,
						compState: compState,
						compZip: cdFour.compZip,
						compEmail: cdFour.compEmail,
						compPhone: cdFour.compPhone,
						details: cdSix.details
					};
					$scope.theData = [data];
				}
			}else{
				sessionStorage.complete = false;
				$location.path('/')
			}
			$scope.edit = function(x){
				sessionStorage.complete = true;
				$location.path('/' + x)
			}
			$scope.next= function(){
				var DTO ={
					"oOdometerFraudFields":data
				};
					sessionStorage.setItem('data', JSON.stringify(data));
					ContactFactory.contactInfo({}, DTO, successcb, errorcb);
			}
			function successcb(data){
				$location.path('/Complete')
			}
			function errorcb(data){
				$scope.err = data.status
			}
}])

.controller('CompleteController', ['$scope','complete', function($scope, complete){
			sessionStorage.clear();
			$scope.next = function(){
				window.location.replace("/");
			}
}])


.animation('an-enter', function() {
        return {
            setup : function(myElement) {
                myElement.css({ 'opacity': 0.3 });
                return {}; //if you want to share some dat between the set and start return it it can be anything
            },
            start : function(myElement, done, data) {
                myElement.animate({
                    'opacity' : 1
                }, 300, function(){
                    done()
                });
            }
        }
        })

//var limit = 1024 * 1024 * 5; // 5 MB
//var remSpace = limit - unescape(encodeURIComponent(JSON.stringify(sessionStorage))).length;
//console.log(remSpace)