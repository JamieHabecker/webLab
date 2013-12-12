angular.module("factories", [])

.factory('message', function() {
    return []
})


.factory('complete', function(){
			if(sessionStorage.complete == 'true'){
				return true;
			}else{
				return false;
			}
		})

.factory('ContactFactory',['$resource', function($resource) {
    var baseUrl = "http://10.156.147.121:443\:443/odometerfraud/Default.aspx/SendFields";
    return $resource(baseUrl, {}, {
        contactInfo : {
            method : 'Post',
            url : baseUrl
        }
    });
}]);
























