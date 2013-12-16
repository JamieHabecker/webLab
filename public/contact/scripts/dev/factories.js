angular.module("factories", [])




.factory('message', function() {
    return []
})


.factory('ContactFactory',['$resource', function($resource) {
    var baseUrl = "/apps/ContactUs/Default.aspx/SendFields";
    return $resource(baseUrl, {}, {
        contactInfo : {
            method : 'Post',
            url : baseUrl
        }
    });
}]);
























