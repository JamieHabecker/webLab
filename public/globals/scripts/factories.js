angular.module("globalFactories", [])

.factory('complete', function(){
			if(sessionStorage.complete === "yes"){
				return true;
			}else{
				return false;
			}
})

.factory('StateFactory',['$resource', function($resource) {
		var dev = window.location.protocol + "//" + window.location.host + "/";
		var baseUrl = dev + "globals/models/states.json";
			return $resource(baseUrl, {}, {
				menu: {
					method : 'GET',
					isArray : true,
					url : baseUrl
				}
			});
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