angular.module("salvageComplaint", ['ngResource','directives','globals','ui.date','factories'])//.value('$anchorScroll', angular.noop)

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
				}
				else if(anonymous === "No"){
					$location.path("/StepFive")
				}
				else if(anonymous === "Yes" && complete){
					$location.path("/Verify")
				}else{
					$location.path("/StepSix")
				}
			}
}])

.controller('StepFiveController', ['$scope','$location','$timeout',function($scope, $location,$timeout){
			var stepFour= sessionStorage.stepFour;
			var stepFive= sessionStorage.stepFive;
			var complete= sessionStorage.complete;
			if(stepFour === undefined){
				//$location.path("/");
			}
			if(stepFive){
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
				if(anonymous === "No"){
					$scope.vary= "sec";
					$scope.vary2= "sec";
					cdTwo = JSON.parse(stepTwo);
					cdThree = JSON.parse(stepThree);
					cdFive = JSON.parse(stepFive);
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
						complDate: cdFive.date,
						learned: cdFive.opts,
						details: cdSix.details
					};
					$scope.theData = [data];
				}else{
					$scope.vary= "gen";
					$scope.vary2= "sec"
					data = {
						pc: "false",
						compName : cdFour.compName,
						compAddress: cdFour.address,
						compCity: cdFour.city,
						compState: compStateCode,
						compZip: cdFour.zip,
						compEmail: cdFour.email,
						compPhone: cdFour.phone,
						details: cdSix.details
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
			$scope.next= function(){
				$scope.isloading = true;
				var DTO ={
					"oOdometerFraudFields": data
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
//console.log(remSpace);var base = "views/directiveTemplates/";
angular.module("directives", [])





.directive('placeholder', ['$timeout', function($timeout){
      if (navigator.userAgent.indexOf("MSIE") < 0) {
        return{
            
        }
    }
   if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
       var s = new Number(RegExp.$1);
       if (s > 10) {
           return
           }else{
               return {
                   link: function(scope, elm, attrs){
                       if (attrs.type === 'password'){
                           return;
                           }
                           $timeout(function(){
                               elm.val(attrs.placeholder).focus(function(){
                                   if ($(this).val() == $(this).attr('placeholder')) {
                                       $(this).val('');
                                       }
                                       }).blur(function(){
                                           if ($(this).val() == ''){
                                               $(this).val($(this).attr('placeholder'));
                                               }});});
                                          }}}}}])
                                          
                                          







.directive('subject', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "subjectSelect.html",
         link: function(scope, elm, attrs){
            
         }
    };
})


.directive('custnumber', ['$parse',function($parse, $templateCache){
    return{
        restrict: "A",
        link: function(scope, elm, iAttrs, controller) {
            var a = $('input').attr('name');
            scope.$watch(a, function(value) {
                if (!value) {
                    return;
                }
                if(value.indexOf("-") !==-1 && value.length === 11){
                     $parse(a).assign(scope, value.replace(/-/g, ''));
                }
            });
        }
    }
}])











;angular.module("dmvPortalConfig", [])

.config(['$provide','$httpProvider','$compileProvider', function($provide, $httpProvider, $compileProvider) {
    var check;
    var y = window.location.host;
    var elementsList = $();
    var token;
    var showMessage = function(content, cl, time, loading) {
        var a = loading;
        $('<h2>').addClass('message').addClass(cl).appendTo(elementsList).text(content);
    };
    $httpProvider.responseInterceptors.push(['$timeout','$q', 'message','$location', '$window', function($timeout, $q, message,$location, $window){
         var redirectTo = {
        SampleKnowledgeExam: function() {
            $location.path("/SampleKnowledgeExam")
        }
    };
        
        return function(promise) {
            var a = sessionStorage.id;
            if ($('div.messagesList').length) {
                $('div.messagesList').empty();
                showMessage('Loading...', 'loadingMessage', 50000);
            } else {
                showMessage('Loading...', 'loadingMessage', 50000);
            }
            return promise.then(function(response) {
                if (response) {
                    $('h2.loadingMessage').fadeOut(1040);
                }
                check = response.headers('x-auth-token');
                if (check !== null && check !== undefined) {
                    token = response.headers('x-auth-token');
                    sessionStorage.id = token;
                    credStore.push(token);
                    var toke = credStore.shift();

                    $httpProvider.defaults.headers.common = {
                        "X-Auth-Token" : toke

                    };
                    $httpProvider.defaults.headers.common = {
                        'Accept' : 'application/json, text/plain, * / *'
                    };

                }

                if (a) {

                    $httpProvider.defaults.headers.get = {
                        'Accept' : 'application/json, text/javascript, */*',
                        

                    }
                    
                    $httpProvider.defaults.headers.post = {
                        'Accept' : 'application/json, text/javascript, */*',
                        "Content-Type" : "application/json; charset=utf-8"

                    }
                     $httpProvider.defaults.headers.put = {
                        'Accept' : 'application/json, text/javascript, */*',
                        "Content-Type" : "application/json; charset=utf-8"

                    }
                }
                return promise

            }, function(errorResponse) {
                var e = errorResponse.data;
                switch(errorResponse.status){
                    case 404:
                        $('div.messagesList').empty();
                        sessionStorage.clear()
                        showMessage(e.STATUS, 'errorMessage', 20000);
                        //$timeout(redirectTo.SampleKnowledgeExam, 2000);
                        break;
                    case 500:
                        $('div.messagesList').empty();
                        sessionStorage.clear()
                        showMessage(e.STATUS, 'errorMessage', 20000);
                        //$timeout(redirectTo.SampleKnowledgeExam, 2000);
                        break;
                    default:
                        showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data, 'errorMessage', 20000);
                }
                return $q.reject(errorResponse);
            });
        };
    }]);
    $compileProvider.directive('appMessages', function() {
        var directiveDefinitionObject = {
            restrict : 'A',
            template : "<div></div>",
            replace : true,
            link : function(scope, element, attrs) {
                elementsList.push($(element));
            }
        };
        return directiveDefinitionObject;
    });

}]); ;angular.module("factories", [])

.factory('message', function() {
    return []
})


.factory('ContactFactory',['$resource', function($resource) {
			var baseUrl = "http://10.156.147.121:443\:443/WebServicesBackEnd/OdometerFraud.aspx/SendFields";
		//var baseUrl = "/apps/WebServicesBackEnd/OdometerFraud.aspx/SendFields";
    return $resource(baseUrl, {}, {
        contactInfo : {
            method : 'Post',
            url : baseUrl
        }
    });
}]);
























