angular.module("globalFactories", [])
.factory('StateFactory',['$resource', function($resource) {
		var dev = "http://localhost";
		var baseUrl = dev + "/globals/models/states.json";
			return $resource(baseUrl, {}, {
				menu: {
					method : 'GET',
					isArray : true,
					url : baseUrl
				}
			});
}]);