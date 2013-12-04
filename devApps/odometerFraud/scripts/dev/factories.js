angular.module("factories", [])

.factory('message', function() {
    return []
})

.factory('complete', function(){
			if(sessionStorage.complete){
				return true;
			}else{
				return false;
			}
		})

.factory('ContactFactory',['$resource', function($resource) {
    var baseUrl = "//10.156.147.131/apps/ContactUs/Default.aspx/SendFields";
    return $resource(baseUrl, {}, {
        contactInfo : {
            method : 'Post',
            url : baseUrl
        }
    });
}]);
























