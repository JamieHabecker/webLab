angular.module("globalFactories", [])

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