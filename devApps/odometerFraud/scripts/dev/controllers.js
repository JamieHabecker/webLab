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

.controller('DisclaimerController', ['$scope','$location', function($scope, $location){
	$scope.next = function(){
		$location.path('/StepOne')
	}
}])

.controller('StepOneController', ['$scope','$location', function($scope, $location){

			//var limit = 1024 * 1024 * 5; // 5 MB
			//var remSpace = limit - unescape(encodeURIComponent(JSON.stringify(sessionStorage))).length;
			//console.log(remSpace)
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
			$location.path("/StepFour")
		}
		
	}
}])

.controller('StepTwoController', ['$scope','$location','$timeout','complete', function($scope, $location, $timeout, complete){
	var a;
	 if(sessionStorage.stepTwo){
	 	var data = sessionStorage.getItem('stepTwo');
	 	var p = JSON.parse(data);
	 	var formFill = {
	 		fillIt : function() {
	 			$scope.firstname= p.firstname;
	 			$scope.lastname  = p.lastname;
	 			$scope.address  = p.address;
	 			$scope.city  = p.city;
	 			$scope.current = sessionStorage.state;
	 			$scope.zip = p.zip
	 			}
	 		};
	 	$timeout(formFill.fillIt, 100);
		 if(complete){
			 $scope.rt = true;
		 }
   }
	$scope.next= function(){
		if($scope.state !== undefined){
			sessionStorage.state = $scope.state.State;
		}
		var stepTwo = {
			firstname : $scope.firstname,
			lastname : $scope.lastname,
			address : $scope.address,
			city: $scope.city,
			zip: $scope.zip
			};
			sessionStorage.setItem('stepTwo', JSON.stringify(stepTwo));
			$location.path("/StepThree")
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
		if(complete){
			$scope.rt = true;
		}
   }
	$scope.next= function(){
		var stepThree = {
			email : $scope.email,
			phone : $scope.phone,
			conPref : $scope.conPref
			};
		sessionStorage.setItem('stepThree', JSON.stringify(stepThree));
		$location.path("/StepFour")
	}
}])

.controller('StepFourController', ['$scope','$location','$timeout','complete', function($scope, $location,$timeout, complete){
			$scope.zip = /^\d\d\d\d\d$/;
			$scope.email= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(sessionStorage.stepFour){
				var data = sessionStorage.getItem('stepFour');
				var p = JSON.parse(data);
				var formFill = {
					fillIt : function() {
						$scope.compName= p.compName;
						$scope.compAddress = p.compAddress;
						$scope.compCity  = p.compCity;
						$scope.current = sessionStorage.compState;
						$scope.compZip = p.compZip;
						$scope.compEmail = p.compEmail;
						$scope.compPhone = p.compPhone;
					}
			};
				$timeout(formFill.fillIt, 100);
				if(complete){
					$scope.rt = true;
				}
			}
	$scope.next= function(){
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
		if(sessionStorage.an){
			$location.path("/StepFive")
		}else{
		$location.path("/StepSix")
		}
	}
}])

.controller('StepFiveController', ['$scope','$location', function($scope, $location){

			$scope.next= function(){
		var stepFive = {
			year: $scope.vyear,
			make: $scope.vmake,
			model: $scope.vmodel,
			vin : $scope.vvin,
			plate: $scope.vplate,
			prmColor: $scope.vprmColor,
			secColor: $scope.vsecColor
		}
		sessionStorage.setItem('stepFive', JSON.stringify(stepFive));
		$location.path('/StepSix')
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
				if(complete){
					$scope.rt = true;
				}
			}
			$scope.next= function(){
				var stepSix = {
					details : $scope.details
				};
				sessionStorage.setItem('stepSix', JSON.stringify(stepSix));
				$location.path('/Verify')
			}
}])

.controller('VerifyController', ['$scope','$location', function($scope,$location){
			var state = sessionStorage.state;
			var compState = sessionStorage.compState;
			sessionStorage.complete = true;
			two = sessionStorage.getItem('stepTwo');
			three = sessionStorage.getItem('stepThree');
			four = sessionStorage.getItem('stepFour');
			five = sessionStorage.getItem('stepFive');
			six = sessionStorage.getItem('stepSix');
			cdTwo = JSON.parse(two);
			cdThree = JSON.parse(three);
			cdFour = JSON.parse(four);
			cdFive = JSON.parse(five);
			cdSix = JSON.parse(six)
			$scope.edit = function(x){
				console.log(x)
				$location.path('/' + x)
			}
			data = {
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
				prmColr: cdFive.prmColr,
				secColr: cdFive.secColr,
				details: cdSix.details
			};
			$scope.theData = [data];
			console.log($scope.theData)

}])









/*
.controller('StepOneController', ['$scope','$location','$timeout', function($scope, $location, $timeout){
   if(sessionStorage.stepOne){
    var one = sessionStorage.getItem('stepOne');
    var cdOne = JSON.parse(one); 
      var formFill = {
        fillIt : function() {
             $scope.email = cdOne.email;
              $scope.firstname  = cdOne.firstname;
              $scope.lastname  = cdOne.lastname;
              $scope.phone  = cdOne.phone;
              $scope.suffix = cdOne.suffix;
              $scope.subject = cdOne.subject;
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
            suffix : $scope.suffix,
            firstname : $scope.firstname,
            lastname : $scope.lastname,
            phone : $scope.phone,
            email : $scope.email,
            subject : $scope.subject
        };
        if($scope.subject === "vi"){
            sessionStorage.vehicles = true;
        } 
        if($scope.subject === "di" || $scope.subject === "vi" || $scope.subject === "su"){
            sessionStorage.drivers = true;
        }
        sessionStorage.setItem('stepOne', JSON.stringify(stepOne));
        $location.path("/StepTwo");
    }
    
    
}])


.controller('StepTwoController', ['$scope','$location','$timeout', function($scope, $location, $timeout){
  if(!sessionStorage.stepOne){
      $location.path("/StepOne");
   }
  if(sessionStorage.vehicles){
      $scope.vehicles = true;
  }
   if(sessionStorage.drivers){
      $scope.drivers = true;
  }
   if(sessionStorage.stepTwo){
       var two = sessionStorage.getItem('stepTwo');
       var cdTwo = JSON.parse(two);
       var formFill = {
        fillIt : function() {
                $scope.title = cdTwo.title;
                $scope.vin = cdTwo.vin;
                 $scope.plate = cdTwo.plate;
                $scope.custnumber = cdTwo.custnumber;
                $scope.description = cdTwo.description;
            }
        }
     $timeout(formFill.fillIt, 100);
   
   }
   
    $scope.next = function(){
        var stepTwo = {
            title : $scope.title,
            vin : $scope.vin,
            plate : $scope.plate,
            custnumber : $scope.custnumber,
            description :  $scope.description
        };
        sessionStorage.setItem('stepTwo', JSON.stringify(stepTwo));
        $location.path("/Verify")
    };
     $scope.back = function() {
        $location.path("/StepOne")
    };
  
    $scope.change = function() {
        var a = $scope.description;
        if (a) {
            $scope.left = 500 - a.length + " chracters remaining";
        } else {
            $scope.left = "500 character limit";
        }
    };
    
    
    
   
        //$scope.mail = cdOne.email
    
}])


.controller('VerifyController',['$scope','$location','ContactFactory', function($scope, $location, ContactFactory){
    var one;
    var two;
    var cdOne;
    var cdTwo;
    var data;
    
    $scope.verify = true;
   if(!sessionStorage.stepOne && !sessionStorage.stepTwo){
      $location.path("/StepOne");
   }else{
    one = sessionStorage.getItem('stepOne');
    two = sessionStorage.getItem('stepTwo');
    cdOne = JSON.parse(one);
    cdTwo = JSON.parse(two);
    data = {
         firstname  : cdOne.firstname,
         lastname  : cdOne.lastname,
         phone  : cdOne.phone,
         email : cdOne.email,
         suffix : cdOne.suffix,
         subject : cdOne.subject,
         realSubject : sessionStorage.subj,
         title : cdTwo.title,
         vin : cdTwo.vin,
         plate : cdTwo.plate,
         custnumber : cdTwo.custnumber,
         description : cdTwo.description
    };
     
   if(cdOne.subject === 'ot'){
       data.realSubject = undefined;
   }
   if(cdOne.phone !== undefined && cdOne.phone.indexOf('804-555') !==-1){
       data.phone = undefined;
   }
    $scope.subj = sessionStorage.subj;
    
    $scope.mail = data.email;
    $scope.contact = [data];
    
   
     var DTO ={
         "oContactUsFields":data 
         
        };
        $scope.addResponse = function(x) {
           
         data.response = x;
        
    };
    $scope.addEmail = function(y) {
          data.getEmail = y;
    };
    }
    $scope.next = function(){
         $scope.isloading = true;
          sessionStorage.setItem('data', JSON.stringify(data));
        ContactFactory.contactInfo({}, DTO, successcb, errorcb);
    };
    $scope.goTo = function(x){
        $location.path(x) 
    };
     function successcb(data){
         $scope.verify = false;
         $location.path('/Complete');
         //sessionStorage.clear();
         
     }
     function errorcb(data){
          $scope.err = data.status
     }
}])







.controller('CompleteController',['$scope','$location','$timeout', function($scope, $location, $timeout){
    var theData;
    var formFill;
    if(!sessionStorage.stepOne && !sessionStorage.stepTwo && !sessionStorage.data){
      $location.path("/StepOne");
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
        
          $scope.goHome = function(x){
        sessionStorage.clear();
        window.location.replace(x);
    }; 
   }

}])
*/

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
        
     