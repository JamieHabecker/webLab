angular.module("factories", [])




.factory('message', function() {
    return []
})


.factory('ContactFactory',['$resource', function($resource) {
    var baseUrl = "http://10.156.147.121:444\:443/WebServicesBackEnd/ContactUs.aspx/SendFields";
    return $resource(baseUrl, {}, {
        contactInfo : {
            method : 'Post',
            url : baseUrl
        }
    });
}]);
























