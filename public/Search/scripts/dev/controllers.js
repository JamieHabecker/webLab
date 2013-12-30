angular.module("dmvPortal", ['ngResource','ngSanitize','directives','dmvPortalConfig','factories'])




.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider,$httpProvider,$location){

   //$httpProvider.defaults.headers.get = {
        //'Accept' : 'application/json, text/javascript, */*'
   //};
    $routeProvider
    .when('/', {
        controller : 'SearchController',
        templateUrl : 'views/search.html'
    })
    .when('/SearchResults:term', {
    	controller : 'ResultsController',
        templateUrl : 'views/search/searchResults.html'
   })
    .otherwise({
        redirectTo : '/'
    })

}])

.controller('MainNavigationController',['$scope','$location','MenuFactory',function($scope, $location, MenuFactory){
   var a = angular.element('.mainNav');
    $scope.menu = "Hide Menu";

    MenuFactory.menu({},{}, successcb, errorcb);
    function successcb(data){
      $scope.menuLinks = data;
      var a = data.slice(0,3)
       $scope.menuLinksss = a;
    }
    function errorcb(err){
      console.log(err)
    }
    $scope.navToggle = function(){
        if($scope.active === "closed"){
          $scope.active = "";
          $scope.menu = "Hide Menu";
          $(a).slideDown('fast');
        }else{
          $scope.active = "closed";
          $scope.menu = "Show Menu";
          $(a).slideUp('fast');
        }
      
    }
}])



.controller('MoreResults', function($scope, ContactFactory){
	$scope.showMore = function(){
     	var data = {
         searchterm : sessionStorage.term,
         startat : sessionStorage.startNext
        }
		 var DTO ={
        "oSearchAttributes":data,
		};
		ContactFactory.contactInfo({},DTO, cb, errorcb);
     }
     
     
     function cb(data){
 		var obj = angular.fromJson(data.d);
 		var theData = obj;
 		sessionStorage.startNext = obj.RES["@EN"];
 		if(theData.RES){
 			if(obj.RES["@EN"] === obj.RES.M){
 			$scope.areMore = false;
 			}else{
 				$scope.areMore = true;
 			}
			$scope.more = theData.RES.R;
			if(theData.GM){
			if(theData.GM.length > 0){
				$scope.gmResponses = theData.GM;
			}else{
				$scope.gmResponses = [theData.GM];
			}
			}else{
				
			}
			angular.forEach($scope.more, function(value, key){
				
    		$('div.add').append('<div moreresults class="responses"><ul><li class="title">' + value.T + '</li><li>' + value.S + '</li><li <a href="' + value.U + '">' + value.U + '</a><li></ul></div>')
   
    })
 
		}else if(theData.SPELLING){
			$scope.spellCheck = theData.spelling.Suggestion;
		}else{
 			$scope.showRes = false;
			$scope.showNone = true;
			$scope.q = $routeParams.term.replace(":", "")
		}
 	}
     
     
     
     
     function errorcb(data){
          $scope.err = data.status
     }
     
     
     
     
     
     
})

.controller('ResultsController',['$scope','results','ContactFactory','$routeParams','$location', function($scope, results,ContactFactory, $routeParams,$location){
	if(sessionStorage.term){
 		var data = {
         searchterm : sessionStorage.term,
        }
		 var DTO ={
         "oSearchAttributes":data,
		};
		ContactFactory.contactInfo({},DTO, successcb, errorcb);
 	}else{
 	$location.path('/SearchResults')
 	}
 	function successcb(data){
 		var obj = angular.fromJson(data.d);
 		var theData = obj;
 		sessionStorage.term = obj.Q;
 		$scope.q = sessionStorage.term;
 		if(theData.RES){
 			var startNext = obj.RES["@EN"];
 			sessionStorage.startNext = startNext;
 			if(obj.RES["@EN"] === obj.RES.M){
 			$scope.areMore = false;
 			}else{
 			$scope.areMore = true;
 			}
 			$scope.showRes = true;
 			$scope.time = theData.TM;
			$scope.total = theData.RES.M;
			$scope.current = theData.RES["@EN"];
			$scope.responses = theData.RES.R;
			if(theData.GM){
			if(theData.GM.length > 0){
				$scope.gmResponses = theData.GM;
			}else{
				$scope.gmResponses = [theData.GM];
			}
			}else{
				//do nothing
			}
		}else if(theData.Spelling){
			$scope.spellCheck = theData.Spelling.Suggestion["@q"];
			console.log($scope.spellCheck)
			$scope.spellcheck = function(){
				sessionStorage.term = $scope.spellCheck;
				$location.path('/SearchResults:' + $scope.spellCheck)
			}
		}else{
 			$scope.showRes = false;
			$scope.showNone = true;
			$scope.q = $routeParams.term.replace(":", "")
		}
 	}
 	
 	//"RES": { "@SN": "1", "@EN": "8", 
 	
 	
	
 	
 	
 	
 	
 	
 	
 	
 	
 	function errorcb(data){
          $scope.err = data.status
     }
     
}])

.controller('SearchController',['$scope','ContactFactory','$parse','results','$location', '$routeParams', function($scope, ContactFactory, $parse, results, $location, $routeParams){
	$scope.search = function(){
		sessionStorage.term = $scope.searchIn;
		$location.path('/SearchResults:' + $scope.searchIn)
}
}])

/*
.controller('StepTwoController', ['$scope','$location','$timeout','$routeParams', function($scope, $location, $timeout, $routeParams){
   console.log($location.path())
   console.log($location.hash())
   
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



.controller('PortalCancelController',['$scope', function($scope){
    $scope.portalCancel = function(){
        window.location.replace("/");
    };
    
}])




.directive('a', [
    function() {
        return {
            restrict: 'E',
            link: function(scope, elem, attrs) {

                elem.bind('click', function(e){
                    if(attrs.href){
                    if (attrs.href.indexOf("Drivers") !==-1){
                        //e.preventDefault();
                        //e.stopPropagation();
                         attrs.$set('href',"#Drivers/drivers");
                        //attrs.href.replace("/Drivers/", "#/Drivers/")
                        //alert("yes")
                    }else{
                        return;
                    }
                   }else{
                       return;
                   }
                })
            }
        };
    }
])
*/
/*

.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            var check =  attrs.href;
            if(check.indexOf('drivers') !==-1){
                elem.on('click', function(e){
                    alert("Yea!!!!")
                });
            }
        }
   };
})

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




/*
angular.module('routes',[]).config([

  '$routeProvider',

  function($routeProvider){
    $routeProvider
      .when('/test', {templateUrl: 'test.html'})
      // This one is important:
      // We define a route that will be used internally and handle 
      // parameters with urls parsed by us via the URLInterceptor service 
      .when('/parsed-url/:url', {templateUrl: 'url.html', controller:'URLCtrl'})
      .when('/', {redirectTo: '/test'})
      .otherwise({templateUrl: '404.html'});

  }

])

*/

//http://stackoverflow.com/questions/16256615/pass-url-to-as-routeparam-in-angularjs-app

/*
//var converter = new Showdown
//.converter();
//var a = converter.makeHtml($scope.searchIn);
//$('#result').html(a)
*/
        
     