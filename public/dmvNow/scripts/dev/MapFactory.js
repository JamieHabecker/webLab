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
				'Locations': function(scope,Locations,Item){
					var latLng;
					var myMap;
					var allOffices;
					var offices = [];
					var themap= scope.myMap;
					scope.notMobile = "notMobile"
					Locations.query({},successcb,errorcb);
					function successcb(data){
						scope.isloading= false;
						scope.LocationDetails = data;
						allOffices= function(){
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
						themap.setOptions({
								center : new google.maps.LatLng(scope.name.lat, scope.name.lng),
								zoom : 15,
								mapTypeId : google.maps.MapTypeId.ROADMAP,
								disableDefaultUI : true
							});
							scope.time = scope.name.wait;
						}
						if(sessionStorage.getItem("Location") === "true"){
							var latlng = new google.maps.LatLng(sessionStorage.userLat, sessionStorage.userLng);
							setMap(latlng);
						}else if(navigator.geolocation && sessionStorage.getItem("Location") !== "true"){
							function positionCallback(position){
								var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
								sessionStorage.setItem("Location","true");
								sessionStorage.setItem("userLat",position.coords.latitude);
								sessionStorage.setItem("userLng",position.coords.longitude);
								setMap(latlng)
							};
							function errorCallback() {
								var latLng = new google.maps.LatLng(38.9177816, -78.1881693);
								setMap(latlng);
							};
							navigator.geolocation.getCurrentPosition(positionCallback,errorCallback,{maximumAge:5000});
						}else{
							var latLng = new google.maps.LatLng(38.9177816, -78.1881693);
							setMap(latlng);
						}
						function setMap(latlng){
							themap.setOptions({
								center : latlng,
								zoom : 15
							});
							drawMap(scope,Locations,Item,latlng);
						}
					}
					function errorcb(err){
						scope.isError= true;
						scope.isloading= false;
						return;
					}
					function drawMap(scope,Locations,Item,latlng){
						var markers = [];
						if(sessionStorage.mapDrawn){
							return;
						}else{
						}
						angular.forEach(scope.LocationDetails, function(value, key) {
							var markerIcon = "/img/dmv_marker.png"
							if (value.OpenClosed === "C" || value.OpenClosed === "E") {
								var markerIcon = "/img/dmv_marker_closed.png"
							}
							var marker = new google.maps.Marker({
								map : themap,
								position : new google.maps.LatLng(value.LATITUDE, value.LONGITUDE),
								title : value.OFFICENAME,
								icon : markerIcon
							});
							scope.myMarkers = markers.push(marker);

							var boxText = document.createElement("div");
							if (value.OpenClosed === "O") {
								boxText.innerHTML = "<a style='cursor:pointer;' data='" + value.ID + "'>" + value.OFFICENAME + "<br/>" + "Current wait: " + value.WAIT + "</a>";
							} else if (value.OpenClosed === "C") {
								boxText.innerHTML = "<a data='" + value.ID + "'>" + value.OFFICENAME + "<br/>Currently Closed</a>";
							}else if (value.OpenClosed === "E") {
								boxText.innerHTML = "<a>" + value.OFFICENAME + "<br/>Closed</a>";
							}
							var ib;
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
								enableEventPropagation : false
							};
							google.maps.event.addDomListener(boxText,'click',function(){
								scope.$emit("detailsClicked", value.ID)
							});
							ib = new InfoBox(myOptions);
							ib.open(scope.myMap, marker);
							google.maps.event.addListener(themap, 'zoom_changed', function() {
								var currentZoom = themap.getZoom();
								if (currentZoom <= 9) {
									ib.hide();
								} else {
									ib.show();
								}
							});
							google.maps.event.addListener(marker, 'click', function() {
								sessionStorage.id= value.ID;
							});
						});
						var markerclusterer = new MarkerClusterer(themap, markers, {
							'gridSize' : 50
						});
						google.maps.event.addListener(markerclusterer, 'clusterclick', function(cluster) {
							var currentZoom = themap.getZoom();
							scope.myMap.setZoom(currentZoom + 2)
						});
						google.maps.event.addListener(themap, 'resize', function(){
							if(!sessionStorage.mapDrawn){
							themap.setOptions({
								center : latlng,
								zoom : 13
							});
							sessionStorage.mapDrawn= true;
							}

						})
						google.maps.event.addListener(themap, 'tilesloaded', function() {
								google.maps.event.trigger(themap, 'resize');
						});
					}

				}




			}



		})