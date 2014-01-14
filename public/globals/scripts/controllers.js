angular.module("globalControllers", ['ngRoute'])


.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider, $httpProvider){
			$httpProvider.defaults.headers.get = {
				'Accept' : 'application/json, text/javascript'
			};
			$routeProvider
					.when('/Error', {
						controller: 'ErrorController',
						templateUrl : 'views/error.html'
					})
					.when('/SearchResults:term', {
						controller : 'ResultsController',
						templateUrl : 'views/search/searchResults.html'
					})
		}])

.controller('PortalCancelController',['$scope',function($scope){
	$scope.portalCancel = function(){
		sessionStorage.clear();
		window.location.replace("/");
	};
}])

.controller('ErrorController', ['$scope', function($scope){
			var err= sessionStorage.err;
			if(err=== "500"){
				$scope.error= "Sorry, our server is currently unavailable. Please try again later."
			}
			if(err=== "404"){
				$scope.error= "Sorry, the requested page could not be found. Please check the URL and try again."
			}
			$scope.next= function(){
				window.location.replace("/");
			}
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
					"oSearchAttributes":data
				};
				console.log("here")
				ContactFactory.contactInfo({},DTO, cb, errorcb);
			}
			/*$('div.responseHold').bind('scroll', function(){
			 if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight)
			 {
			 if($scope.showMore !== null){
			 var data = {
			 searchterm : sessionStorage.term,
			 startat : sessionStorage.startNext
			 }
			 var DTO ={
			 "oSearchAttributes":data
			 };
			 console.log("here")
			 setTimeout(function(){
			 ContactFactory.contactInfo({},DTO, cb, errorcb);
			 }, 300)
			 }
			 }
			 })*/
			function cb(data){
				console.log("here too")
				var obj = angular.fromJson(data.d);
				var theData = obj;
				sessionStorage.startNext = obj.RES["@EN"];
				if(theData.RES){
					if(obj.RES["@EN"] === obj.RES.M){
						$scope.areMore = false;
						$scope.showMore= null;
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

.controller('SearchController',['$scope','ContactFactory','$parse','results','$location', '$routeParams', function($scope, ContactFactory, $parse, results, $location, $routeParams){
			$scope.search = function(){
				sessionStorage.term = $scope.searchIn;
				var q= "q=" + $scope.searchIn;
				//$location.path('/SearchResults:' + $scope.searchIn);
				window.location.replace("http://search.dmv.virginia.gov/search?mode=allwords&reload=1&debug=1&client=dmvnow_front&proxystylesheet=dmvnew_front&output=xml_no_dtd&site=default_collection&" + q + "&proxyreload=1&btnSearch=Search")
			}
}])

.controller('ResultsController',['$scope','results','ContactFactory','$routeParams','$location', function($scope, results,ContactFactory, $routeParams,$location){
			if(sessionStorage.term){
				var data = {
					searchterm : sessionStorage.term
				}
				var DTO ={
					"oSearchAttributes":data
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


