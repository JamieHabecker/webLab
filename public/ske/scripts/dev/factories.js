

angular.module("factories", [])


		.factory('questionsMissed', function(){
			return [];
})

		.factory('numberWrong', function(){
			return [];
})

		.factory('type', function(){
			return [];
})

		.factory('message', function() {
			return []
})

		.factory('theExam', function(){
			var theData = {};
			return theData;
})

		.factory('knowledgeFactory',['$resource', function($resource) {
		//var baseUrl = "http://10.156.147.121:443\:443/WebServicesBackEnd/SampleKnowledgeExam.aspx/GetSKE";
			var baseUrl = "/apps/WebServicesBackEnd/SampleKnowledgeExam.aspx/GetSKE";
			return $resource(baseUrl, {}, {
				skeQuestions : {
					method : 'Post',
					url : baseUrl
				}
			});
}]);























