

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
	var baseUrl = "http://10.156.147.121:4040\:4040/SampleKnowledgeExam/default.aspx/GetQuestions";
	return $resource(baseUrl, {}, {
		skeQuestions : {
		method : 'POST',
		url : baseUrl
		}
	});
}]);























