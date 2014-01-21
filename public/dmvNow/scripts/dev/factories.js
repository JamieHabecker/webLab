angular.module("factories", ['MapFactory'])

.factory('NoticesFactory',['$resource', function($resource) {
			var baseUrl = "http://dmvnew/apps/dmvnowinterface/dmvnowinterface.aspx?function=notices";
			return $resource(baseUrl, {}, {
				query : {
					method : 'GET',
					url : baseUrl,
					isArray:true
				}
			});
}])

.factory('NoticesDetails',['$resource', function($resource){
			var baseUrl= 'http://dmvnew/apps/dmvnowinterface/dmvnowinterface.aspx?function=noticesdetails';
			return $resource(baseUrl, {}, {
				query : {
					method : 'GET',
					url : baseUrl,
					isArray:true,
					cache:false
				}
			});
}])

.factory('Notices', function(){
			var a={
				'getNotices': function($scope,NoticesFactory){
					NoticesFactory.query({}, {}, successcb, errorcb);
					function successcb(data){
						$scope.isloading= false;
						if(data.length === 0){
							$scope.noNotices= true;
						}else{
							console.log(data)
							$scope.importantNotices = data;
							angular.forEach(data, function(value, key){
								$scope.isViewLoading = false;
								if(value.TYPE === "I"){
									value.link = "#/Notice:" + value.LINK;
								}else{
									value.link = value.LINK;
						}
					})
				}
			}
			function errorcb(err){
				$scope.isloading= false;
				$scope.isError= true;
				console.log(err)
			}
			/*
			 $scope.importantNotices = NoticesResource.query();
			 $scope.importantNotices.then(function(importantNotices){
			 if(importantNotices.length === 0){
			 $location.path( "/Locations");
			 }else if(importantNotices.length === 0){
			 $scope.noData= true;
			 $scope.isViewLoading= false;
			 $location.path( "/Locations");
			 }else{
			 angular.forEach(importantNotices, function(value, key){
			 $scope.isViewLoading = false;
			 if(value.TYPE === "I"){
			 value.link = "#/Notice:" + value.LINK;
			 } else{
			 value.link = value.LINK;
			 }
			 });
			 }
			 },function(status){
			 $scope.isError = true;
			 $scope.isViewLoading = false;
			 });
			 */
				}
			}
		return a;

})

.factory('DMVGoFactory',['$resource', function($resource){
			var baseUrl = "http://dmvnew/apps/dmvnowinterface/dmvnowinterface.aspx?function=events";
			return $resource(baseUrl, {}, {
				query : {
					method : 'GET',
					url : baseUrl,
					isArray:true
				}
			});
		}])

		.factory('WhatsNewFactory',['$resource', function($resource){
			var baseUrl = "http://dmvnew/apps/dmvnowinterface/dmvnowinterface.aspx?function=whatsnew";
			return $resource(baseUrl, {}, {
				query : {
					method : 'GET',
					url : baseUrl,
					isArray:true
				}
			});
		}])

.factory('NewsFactory',['$resource', function($resource){
			var baseUrl = "http://dmvnew/apps/dmvnowinterface/dmvnowinterface.aspx?function=news";
			return $resource(baseUrl, {}, {
				query : {
					method : 'GET',
					url : baseUrl,
					isArray:true
				}
			});
		}])


