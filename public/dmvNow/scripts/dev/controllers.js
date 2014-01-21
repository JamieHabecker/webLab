

angular.module("dmvPortal", ['ngResource','ngSanitize','ngCookies','ui.map','ui.event','directives','globals','factories','sliders'])//.value('$anchorScroll', angular.noop)


.config(['$routeProvider','$locationProvider','$httpProvider',function($routeProvider,$locationProvider,$httpProvider){
//$httpProvider.defaults.headers.get = {
// 'Accept' : 'application/json, text/javascript, */*'
// };
			var template= '<article class="content" ng-include="templateUrl"><h1 class="loaderText">Loading...</h1></h1></div>'

	$routeProvider
			.when('/Home', {
				controller : 'DMVHomeController',
				templateUrl : 'views/dmvHome.html'
			})
			.when('/drivers:name', {
				template:template,
				controller : 'TestController'
			})
			.when('/OnlineServices', {
				templateUrl:"views/onlineServices.html",
				controller : 'OnlineServicesController'
			})
			.otherwise({
					redirectTo : '/Home'
		})
}])

.controller('TestController', function($scope,$routeParams,$location){
			var a= $routeParams.name;
			var b= a.replace(":", "");
			console.log(a)
			//a.replace(":", "");
			$scope.templateUrl = "/views/drivers/" + b + ".html";
			$scope.tile= "Applying for a Driver's License"
})

.controller('DMVHomeController',['$scope','$location','message','Locations','NoticesFactory','NoticesDetails','Item','DMVGoFactory','WhatsNewFactory',function($scope,$location,message,Locations,NoticesFactory,NoticesDetails,Item,DMVGoFactory,WhatsNewFactory){
			$scope.isloading= true;
			$scope.activePath= "/Locations";
			sessionStorage.removeItem("mapDrawn")
			message.Locations($scope,Locations,Item);
			$scope.tab= function(x){
			if($scope.isloading){
				return;
			}else{
				$scope.isloading= true;
				$scope.isError= false;
				if(x === "Notices"){
					var successcb= function(data){
						$scope.isloading= false;
						if(data.length === 0){
							$scope.noNotices= true;
						}else{
							$scope.importantNotices = data;
							angular.forEach(data, function(value, key){
								console.log(value)
								if(value.TYPE === "I"){
									value.link = "";
								}else{
									value.link = value.LINK;
								}
						})
							$scope.check= function(x,y){
								if(x === "I"){
									$scope.isloading= true;
									$scope.isError = false;
									function successcb(data){
										$scope.activePath= "/Notice";
										$scope.isloading = false;
										if(data.length === 0) {
											$scope.noData = true;
											$scope.notice= false;
										}else{
											$scope.noData = false;
											$scope.title= sessionStorage.noticeTitle;
											$scope.notice = data[0]
										}
									}
									function errorcb(err){
										$scope.isError= true;
										$scope.isloading= false;
										console.log(err)
									}
									NoticesDetails.query({NoticeId: y}, successcb, errorcb)
								}else{

								}
							}
						}
					}
					var errorcb= function(err){
						$scope.isloading= false;
						$scope.isError= true;
						console.log(err)
					}
					$scope.activePath= "/Notices";
					NoticesFactory.query({},successcb, errorcb);
				}
				if(x === "Locations" && $scope.activePath !== "/Locations"){
					$scope.activePath= "/Locations";
					message.Locations($scope,Locations,Item);
				}
				if(x === "dmvgo"){
					$scope.activePath= "/DMV2Go";
					var successcb= function(data){
						$scope.isError = false;
						$scope.isloading = false;
						if(data.length === 0){
							$scope.noEvents= true;
						}
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

						}
					var errorcb= function(err){
						$scope.isError= true;
					}
					DMVGoFactory.query({},successcb, errorcb)
				}
				if(x === "moving"){
					$scope.isloading= false;
					$scope.activePath= "/Moving";
				}
				if(x === "new"){
					function successcbb(data){
						$scope.isloading = false;
						if (data.length === 0){
							$scope.activePath= "/WhatsNew"
							$scope.noData = true;
						}else{
							$scope.activePath= "/WhatsNew"
							$scope.whatsNew = data;
						}
					}
					function errorcbb(err){
						$scope.isloading = false;
						$scope.isError = true;
					}
					WhatsNewFactory.query({},successcbb,errorcbb);
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


.controller('NewsController', ['$scope','NewsFactory','$location', function($scope, NewsFactory,$location){
			NewsFactory.query({},successcb,errorcb);
			function successcb(data){
				if(data.length === 0){
					$scope.noNews= true;
					$scope.isloading= false;
				}else{
					$scope.isloading= false;
					$scope.News= data;
				}
			}
			function errorcb(err){
			}
			$scope.next= function(x){
				var newUrl= '/general/news/pressReleases/#/News_Article:' + x
				window.location.href = newUrl;
			}
}])

.controller('OnlineServicesController', function($scope){

		})


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