angular.module("factories", [])

.factory('message', function() {
    return []
})

.factory('complete', function(){
			if(sessionStorage.complete == true){
				return true;
			}else{
				return false;
			}
		})


.factory('UserFactory',['$resource', function($resource) {
			var baseUrl = "//localhost/user/new";
			return $resource(baseUrl, {}, {
				user : {
					method : 'Get',
					url : "//localhost/"
				},
				create : {
					method : 'Post',
					url : baseUrl
				}
			});
}])
























