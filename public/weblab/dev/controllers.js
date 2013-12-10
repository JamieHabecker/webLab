angular.module("webLab", ['ngResource','directives','dmvPortalConfig','globals','factories'])//.value('$anchorScroll', angular.noop)

.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider, $httpProvider){
	$httpProvider.defaults.headers.get = {
		'Accept' : 'application/json, text/javascript, */*'
	};
	$routeProvider
	.when('/', {
		controller : 'DisclaimerController',
		templateUrl : 'views/home.html'
	})
	.when('/DMVNow', {
				//controller : 'DisclaimerController',
				templateUrl : 'views/dmvnow.html'
	})
	.when('/WebServices', {
				//controller : 'DisclaimerController',
				templateUrl : 'views/webservices.html'
	})
	.when('/myDMV', {
				//controller : 'DisclaimerController',
				templateUrl : 'views/myDMV.html'
			})
	.when('/Contributors', {
				controller : 'ContributorsController',
				templateUrl : 'views/contributors.html'
	})
	.when('/SignUp', {
				controller : 'SignUpController',
				templateUrl : 'views/userForm.html'
	})
	.otherwise({
		redirectTo : '/'
	});

}])

.controller('SignUpController', ['$scope','UserFactory', function($scope, UserFactory){
	$scope.next= function(){
		var data ={
			name: $scope.fn,
			email: $scope.email
		}
		console.log(data)
		UserFactory.create({},data, successcb, errorcb);
}
			function successcb(data){
					console.log(data)
			}
			function errorcb(err){
			console.log(err)
			}
}])

.controller('DisclaimerController', ['$scope','$location','UserFactory', function($scope,$location,UserFactory){
			UserFactory.user({},{}, successcb, errorcb);
			function successcb(data){
				if(sessionStorage.id === "yes"){
					$location.path("/Contributors")
				}
			}
			function errorcb(err){
				console.log(err)
			}
}])

.controller('ContributorsController', ['$scope',function($scope){




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
				$scope.isloading = true;
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