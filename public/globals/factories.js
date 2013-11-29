var dev = "http://localhost";

angular.module("globalFactories", [])


.factory('StateFactory',['$resource', function($resource) {
		var baseUrl = dev + "/globals/models/states.json";
			return $resource(baseUrl, {}, {
				menu: {
					method : 'GET',
					isArray : true,
					url : baseUrl
				}
			});
}])