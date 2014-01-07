angular.module("dmvPortal", ['ngResource','ngSanitize','ngCookies','ui.map','ui.event','directives','globals','factories','sliders']).value('$anchorScroll', angular.noop)


.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider,$httpProvider){
//$httpProvider.defaults.headers.get = {
// 'Accept' : 'application/json, text/javascript, */*'
// };
	$routeProvider
			.when('/Home', {
				controller : 'DMVHomeController',
				templateUrl : 'views/dmvHome.html'
			})
			.otherwise({
					redirectTo : '/Home'
		})
}])


.controller('DMVHomeController',['$scope','$routeParams','$timeout','$location','$cookieStore','message','Locations','Notices','NoticesFactory','Item',function($scope,$routeParams,$timeout,$location,$cookieStore,message,Locations,Notices,NoticesFactory,Item){
			$scope.isloading= true;
			console.log("home controller")
			$scope.activePath= "/Locations";
			sessionStorage.removeItem("mapDrawn");
			message.Locations($scope,Locations,$routeParams,$cookieStore,Item);
			$scope.tab= function(x){
			if($scope.isloading){
					return;
				}else{
				$scope.isloading= true;
				$scope.isError= false;
				if(x === "Notices"){
					$scope.activePath= "/Notices";
					sessionStorage.mapDrawn= false;
					Notices.getNotices($scope,NoticesFactory)
				}
				if(x === "Locations" && $scope.activePath !== "/Locations"){
					$scope.activePath= "/Locations";
					message.Locations($scope,Locations,$routeParams,$cookieStore,Item);
				}
				}
			}
			$scope.$on('detailsClicked', function(event, details) {
				$scope.activePath= "/Details";
				$scope.isloading= true;
				Item.query({CSCId: details}, detailscb);
				function detailscb(data){
					$scope.d= data[0];
					$scope.isloading= false;
					var today = new Date();
					$scope.status= data[0].OpenClosed;
					$scope.srrc= '/img/csc/' + data[0].ID + 'exF.jpg';
					if($scope.status === "O"){
						$scope.status= ": Open"
					}else if($scope.status === "C" || $scope.status === "E"){
						$scope.status= ": Closed"
					}
				}
			});
}])




.controller('DMVGoController', function($scope,$http,$location){
			$scope.activePath = $location.path();
			$scope.isloading = true;
			$scope.isError = false;
			$scope.s= "Hello"
			$http.get('http://dmvnew/apps/dmvnowinterface/dmvnowinterface.aspx?function=events', {
				cache : true
			}).success(function(data){
						$scope.isloading = false;
						function replace(x){
							return x.replace(/[^0-9]+/g, "");
						}
						try{
							$scope.dayOneDate = $scope.eventsOne = data[0].e_list[0].E_DAYS[0].E_Date;
							$scope.dayOne = replace($scope.dayOneDate);
							$scope.dayOneEvents = $scope.eventsOne = data[0].e_list[0].E_DAYS;
						}catch(e){

						}
						try{
							$scope.dayTwoDate = $scope.eventsTwo = data[1].e_list[0].E_DAYS[0].E_Date;
							$scope.dayTwo = replace($scope.dayTwoDate);
							$scope.dayTwoEvents = $scope.eventsTwo = data[1].e_list[0].E_DAYS;
						}
						catch(e){
							$scope.eventDate = false;
						}

						try{
							$scope.dayThreeDate = $scope.eventsThree = data[2].e_list[0].E_DAYS[0].E_Date;
							$scope.dayThree = replace($scope.dayThreeDate);
							$scope.dayThreeEvents = $scope.eventsThree = data[2].e_list[0].E_DAYS;
						}
						catch(e){
							$scope.eventDate = false;
						}

						try{
							$scope.dayFourDate = $scope.eventsFour = data[3].e_list[0].E_DAYS[0].E_Date;
							$scope.dayFour = replace($scope.dayFourDate);
							$scope.dayFourEvents = $scope.eventsFour = data[3].e_list[0].E_DAYS;
						}
						catch(e){
							$scope.eventDate = false;
						}

						try{
							$scope.dayFiveDate = $scope.eventsFive = data[4].e_list[0].E_DAYS[0].E_Date;
							$scope.dayFive = replace($scope.dayFiveDate);
							$scope.dayFiveEvents = $scope.eventsFive = data[4].e_list[0].E_DAYS;
						}
						catch(e){
							$scope.eventDate = false;
						}
						try{
							$scope.daySixDate = $scope.eventsSix = data[5].e_list[0].E_DAYS[0].E_Date;
							$scope.daySix = replace($scope.daySixDate);
							$scope.daySixEvents = $scope.eventsSix = data[5].e_list[0].E_DAYS;
						}
						catch(e){
							$scope.eventDate= false;
						}

					}).error(function() {
						$scope.isloading= false;
						$scope.isError= true;
					});
})


























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