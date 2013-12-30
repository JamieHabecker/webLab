angular.module("factories", [])

.factory('message', function() {
    return []
})

.factory('ContactFactory',['$resource', function($resource) {
		//var baseUrl = "http://10.156.147.121:443\:443/WebServicesBackEnd/SalvageComplaint.aspx/SendFields";
		var baseUrl = "/apps/WebServicesBackEnd/SalvageComplaint.aspx/SendFields";
    return $resource(baseUrl, {}, {
        contactInfo : {
            method : 'Post',
            url : baseUrl
        }
    });
}]);
























