angular.module("MapFactory", [])

.factory('Locations',['$resource', function($resource) {
			var baseUrl = "http://dmvnew/apps/dmvnowinterface/DMVNowInterface.aspx?function=locations";
			return $resource(baseUrl, {}, {
				query : {
					method : 'GET',
					url : baseUrl,
					isArray:true
				}
			});
}])


.factory('Item',['$resource', function($resource) {
			return $resource("http://dmvnew/apps/dmvnowinterface/DMVNowInterface.aspx?function=locationsDetails")
}])


.factory('message', function() {
			return{
				'Locations': function(scope,Locations,$routeParams,$cookieStore,Item,fun){
					var latLng;
					scope.notMobile = "notMobile"


					Locations.query({},successcb,errorcb);
					function successcb(data){
						scope.isloading= false;
						scope.LocationDetails = data;
						var allOffices= function(){
							var offices= []
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
						scope.colors = allOffices();
						scope.update = function() {
						scope.myMap.setOptions({
								center : new google.maps.LatLng(scope.name.lat, scope.name.lng),
								zoom : 15,
								mapTypeId : google.maps.MapTypeId.ROADMAP,
								disableDefaultUI : true
							});
							scope.time = scope.name.wait;
						}
						if(sessionStorage.mapDrawn){
						}else{
							drawMap(scope, fun);
						}
					}
					function errorcb(err){
						scope.isError= true;
					}
					if(sessionStorage.getItem("Location") === "true"){
						var lat = sessionStorage.getItem("userLat");
						var lng= sessionStorage.getItem("userLng");
						latLng = new google.maps.LatLng(lat,lng);
					}else if(navigator.geolocation && sessionStorage.getItem("Location") !== "true"){
						sessionStorage.removeItem("Location");
						navigator.geolocation.getCurrentPosition(positionCallback,errorCallback,{maximumAge:5000});
						console.log("getting location")
					}else{
						latLng = new google.maps.LatLng(38.9177816, -78.1881693)
						console.log("no location")
					}
					function positionCallback(position){
						latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
						scope.myMap.setCenter(latLng);
						sessionStorage.setItem("Location","true");
						sessionStorage.setItem("userLat",position.coords.latitude);
						sessionStorage.setItem("userLng",position.coords.longitude);

					};
					function errorCallback() {
						latLng = new google.maps.LatLng(38.9177816, -78.1881693)
					};
					scope.mapOptions = {
						center:  latLng,
						zoom : 10,
						mapTypeId : google.maps.MapTypeId.ROADMAP,
						disableDefaultUI : true,
						zoomControl : true,
						zoomControlOptions : {
						style : google.maps.ZoomControlStyle.SMALL
						}

					};

					function drawMap(scope, fun){
						sessionStorage.mapDrawn= true;
						var markers = [];
						var test= function(x){
							alert("clicked " + x)
						}
						angular.forEach(scope.LocationDetails, function(value, key) {
							var markerIcon = "/img/dmv_marker.png"
							if (value.OpenClosed === "C" || value.OpenClosed === "E") {
								var markerIcon = "/img/dmv_marker_closed.png"
							}
							var marker = new google.maps.Marker({
								map : scope.myMap,
								position : new google.maps.LatLng(value.LATITUDE, value.LONGITUDE),
								title : value.OFFICENAME,
								icon : markerIcon
							});
							scope.myMarkers = markers.push(marker);
							var a= fun;
							var boxText = document.createElement("div");
							if (value.OpenClosed === "O") {
								boxText.innerHTML = "<a style='cursor:pointer;' data='" + value.ID + "'>" + value.OFFICENAME + "<br/>" + "Current wait: " + value.WAIT + "</a>";
							} else if (value.OpenClosed === "C") {
								boxText.innerHTML = "<a data='" + value.ID + "'>" + value.OFFICENAME + "<br/>Currently Closed</a>";
							}else if (value.OpenClosed === "E") {
								boxText.innerHTML = "<a>" + value.OFFICENAME + "<br/>Closed</a>";
							}
							var myOptions = {
								content: boxText,
								disableAutoPan : true,
								maxWidth : 0,
								pixelOffset : new google.maps.Size(-75, 0),
								zIndex : null,
								boxStyle : {
									//background: "url('tipbox.gif') no-repeat"
									opacity : 0.75,
									width : "150px"
								},
								closeBoxMargin : "10px 2px 2px 2px",
								closeBoxURL : "",
								infoBoxClearance : new google.maps.Size(1, 1),
								isHidden : false,
								pane : "floatPane",
								enableEventPropagation : false,
							};

							var ib = new InfoBox(myOptions);
							google.maps.event.addDomListener(boxText,'click',function(){
								scope.$broadcast("detailsClicked", value.ID)
							});
							ib.open(scope.myMap, marker);
							google.maps.event.addListener(scope.myMap, 'zoom_changed', function() {
								var currentZoom = scope.myMap.getZoom();
								if (currentZoom <= 9) {
									ib.hide();
								} else {
									ib.show();
								}
							});
							google.maps.event.addListener(marker, 'click', function() {
								//window.location.replace("#/Office:" + value.ID);
								sessionStorage.id= value.ID;
							});
						});
						var markerclusterer = new MarkerClusterer(scope.myMap, markers, {
							'gridSize' : 50
						});
						google.maps.event.addListener(markerclusterer, 'clusterclick', function(cluster) {
							var currentZoom = scope.myMap.getZoom();
							scope.myMap.setZoom(currentZoom + 2)
						});
						//google.maps.event.addListener(scope.myMap, 'resize', function() {})
						google.maps.event.addListener(scope.myMap, 'tilesloaded', function() {
							google.maps.event.trigger(scope.myMap, 'resize');
						});
					}

				}
			}
		})






/*
if (!_.isEmpty($routeParams)) {
	latLng = new google.maps.LatLng($routeParams.lat, $routeParams.lng)
}else if(sessionStorage.getItem("Location") === "true"){
	var lat = sessionStorage.getItem("userLat");
	var lng= sessionStorage.getItem("userLng");
	latLng = new google.maps.LatLng(lat,lng);
}else if(navigator.geolocation && sessionStorage.getItem("Location") !== "true"){
	sessionStorage.removeItem("Location");
	navigator.geolocation.getCurrentPosition(positionCallback,errorCallback,{maximumAge:5000});
}else{
	latLng = new google.maps.LatLng(38.9177816, -78.1881693)
}

function positionCallback(position){
	latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	scope.myMap.setCenter(latLng);
	sessionStorage.setItem("Location","true");
	sessionStorage.setItem("userLat",position.coords.latitude);
	sessionStorage.setItem("userLng",position.coords.longitude);

};
function errorCallback() {
	latLng = new google.maps.LatLng(38.9177816, -78.1881693)
};
*/



















