

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
		var baseUrl = "http://10.156.147.121:443\:443/SampleKnowledgeExam/default.aspx/GetQuestions";
		//var baseUrl = "/apps/WebServicesBackEnd/SampleKnowledgeExam.aspx/Getquestions";
			return $resource(baseUrl, {}, {
				contactInfo : {
					method : 'Post',
					url : baseUrl
				}
			});
}]);























