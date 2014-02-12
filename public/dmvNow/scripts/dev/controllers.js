angular.module("dmvPortal", ['globals','ui.map','ui.event','directives','factories','sliders'])//.value('$anchorScroll', angular.noop)


.config(['$routeProvider','$locationProvider','$httpProvider',function($routeProvider,$locationProvider,$httpProvider){
			$httpProvider.defaults.headers.get = {
				'Accept' : 'application/json, text/javascript, */*'
			};
			$routeProvider
					.when('/Home', {
						controller : 'DMVHomeController',
						templateUrl : 'views/dmvHome.html'
					})
					.when('/OnlineServices', {
						templateUrl:"views/onlineServices.html",
						controller : 'OnlineServicesController'
					})
					.otherwise({
						redirectTo : '/Home'
					})
}])


.controller('DMVHomeController',['$scope','$location','message','Locations','NoticesFactory','NoticesDetails','DMVGoFactory','WhatsNewFactory','Item',function($scope,$location,message,Locations,NoticesFactory,NoticesDetails,DMVGoFactory,WhatsNewFactory,Item){
			$scope.activePath= "/Locations";
			$scope.tab= function(x){
				$scope.isloading= true;
				$scope.isError= false;
				if(x === "Notices"){
					$scope.activePath= "/Notices";
					$scope.isloading= true;
					var successcb= function(data){
						$scope.isloading= false;
						if(data.length === 0){
							$scope.noNotices= true;
						}else{
							$scope.importantNotices = data;
							angular.forEach(data, function(value, key){
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
										$scope.activePath= "/NoticeDetails";
										$scope.isloading = false;
										if(data.length === 0) {
											$scope.noData = true;
											$scope.notice= false;
										}else{
											$scope.noData = false;
											$scope.isloading= false;
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
					NoticesFactory.query({},successcb, errorcb);
				}
				if(x === "Locations"){
					$scope.activePath= "/Locations";
				}
				if(x === "dmvgo"){
					$scope.activePath= "/DMV2Go";
					$scope.isloading= true;
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
			var latLng;
			Locations.query({},successcb,errorcb);
			function successcb(data){
				$scope.isloading= false;
				var allOffices= function(){
					var offices = [];
					angular.forEach(data, function(value, key){
						if(value.WAIT === "00:00"){
							value.WAIT = "No Wait"
						}else if(value.WAIT === null){
							value.WAIT = "N/A"
						}else{

						}
						offices.push({
							name: value.OFFICENAME,
							lat: value.LATITUDE,
							lng: value.LONGITUDE,
							wait: value.WAIT
						})
					});
					return offices;
				}
				$scope.colors = allOffices();
				drawMap($scope,data);
			}
			if(Modernizr.geolocation && !sessionStorage.userLat){
				navigator.geolocation.getCurrentPosition(function(position) {
					var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					$scope.myMap.setCenter(pos);
					sessionStorage.setItem("userLat",position.coords.latitude);
					sessionStorage.setItem("userLng",position.coords.longitude);
				})
			}else if(sessionStorage.userLat){
				var latLng = new google.maps.LatLng(sessionStorage.userLat, sessionStorage.userLng);
			}else{
				var latLng = new google.maps.LatLng(38.9177816, -78.1881693);
			}
				$scope.mapOptions = {
					center: latLng,
					zoom : 10,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					disableDefaultUI : true,
					zoomControl : true,
					zoomControlOptions : {
						style : google.maps.ZoomControlStyle.SMALL
					}
				}


			$scope.$on('detailsClicked', function(event, details) {
				$scope.activePath= "/Details";
				$scope.isloading= true;
				Item.query({CSCId: details}, detailscb, errorcb);
				function detailscb(data){
					$scope.isloading= false;
					$scope.d= data[0];
					var today = new Date();
					$scope.status= data[0].OpenClosed;
					$scope.srrc= '/img/csc/' + data[0].ID + 'exF.jpg';
					if($scope.status === "O"){
						$scope.status= ": Open"
					}else if($scope.status === "C" || $scope.status === "E"){
						$scope.status= ": Closed"
					}
				}
				function errorcb(err){
					$scope.errr= true;
					$scope.isloading= false;
				}
				$scope.details= function(x){
					window.location.href= "/general/#csc/csc.asp?id=" + x;
				}
			});





			function errorcb(err){
				console.log(err)
			}

			$scope.update = function() {
				$scope.myMap.setOptions({
					center : new google.maps.LatLng($scope.name.lat,$scope.name.lng),
					zoom : 15,
					mapTypeId : google.maps.MapTypeId.ROADMAP,
					disableDefaultUI : true
				});
				$scope.time = $scope.name.wait;
			}

/*
			google.maps.event.addListener($scope.myMap, 'resize', function(){
				$scope.myMap.setOptions({
					center : latLng
				});
			})
			google.maps.event.addListener($scope.myMap, 'tilesloaded', function() {
				google.maps.event.trigger($scope.myMap, 'resize');
				console.log("here")
			});
		*/


			function drawMap($scope,data){
				var markers = [];
				var markerclusterer;
				angular.forEach(data, function(value, key){
					var markerIcon;
					if (value.OpenClosed === "C" || value.OpenClosed === "E") {
						markerIcon = "/img/dmv_marker_closed.png";
					}else{
						markerIcon = "/img/dmv_marker.png";
					}
					var marker = new google.maps.Marker({
						map : $scope.myMap,
						position : new google.maps.LatLng(value.LATITUDE, value.LONGITUDE),
						title : value.OFFICENAME,
						icon : markerIcon
					});
					$scope.myMarkers = markers.push(marker);
					var boxText = document.createElement("div");
					if (value.OpenClosed === "O") {
						boxText.innerHTML = "<a style='cursor:pointer;' data='" + value.ID + "'>" + value.OFFICENAME + "<br/>" + "Current wait: " + value.WAIT;
						+"</a>";
					} else if (value.OpenClosed === "C") {
						boxText.innerHTML = "<a style='cursor:pointer;' data='" + value.ID + "'>" + value.OFFICENAME + "<br/>Currently Closed</a>";
					}else if (value.OpenClosed === "E") {
						boxText.innerHTML = "<a style='cursor:pointer;' data='" + value.ID + "'>" + value.OFFICENAME + "<br/>Closed</a>";
					}
					var myOptions = {
						content : boxText,
						disableAutoPan : true,
						maxWidth : 0,
						pixelOffset : new google.maps.Size(-75, 0),
						zIndex : null,
						boxStyle : {
							opacity : 0.75,
							width : "150px"
						},
						closeBoxMargin : "10px 2px 2px 2px",
						closeBoxURL : "",
						infoBoxClearance : new google.maps.Size(1, 1),
						isHidden : false,
						pane : "floatPane",
						enableEventPropagation : true
					};
					var ib = new InfoBox(myOptions);
					ib.open($scope.myMap, marker);
					google.maps.event.addListener($scope.myMap, 'zoom_changed', function() {
						var currentZoom = $scope.myMap.getZoom();
						if (currentZoom <= 9) {
							ib.hide();
						} else {
							ib.show();
						}
					});
					google.maps.event.addDomListener(boxText,'click',function(){
						$scope.$broadcast("detailsClicked", value.ID)
					});
					google.maps.event.addListener(marker, 'click', function() {
						//window.location.replace("#/Office:" + value.ID)
					});
				});
				markerclusterer = new MarkerClusterer($scope.myMap, markers, {
					'gridSize' : 50
				});
				google.maps.event.addListener(markerclusterer, 'clusterclick', function(cluster) {
					var currentZoom = $scope.myMap.getZoom();
					$scope.myMap.setZoom(currentZoom + 2)
				});
			}


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

