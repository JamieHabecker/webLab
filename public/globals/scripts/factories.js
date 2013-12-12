angular.module("globalFactories", [])

.factory('complete', function(){
			if(sessionStorage.complete === 'true'){
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
}]);