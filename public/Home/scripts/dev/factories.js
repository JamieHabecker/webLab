angular.module("factories", [])




.factory('message', function() {
    return []
})
.factory('addressStore', function(){
    var theData = {};
    return theData;
})
.factory('results', function() {
	var resultData = {};
    return resultData;
})










.factory('ContactFactory',['$resource', function($resource) {
    var baseUrl = "//10.156.147.131/dmvForms/default.aspx/SendSearchAttributes";
    return $resource(baseUrl, {}, {
        contactInfo : {
            method : 'POST',
            url : baseUrl
        }
    });
}])


.factory('MenuFactory',['$resource', function($resource) {
    var baseUrl = "/models/mainMenu.json";
    return $resource(baseUrl, {}, {
        menu: {
            method : 'GET',
            isArray : true,
            url : baseUrl
        }
    });
}])