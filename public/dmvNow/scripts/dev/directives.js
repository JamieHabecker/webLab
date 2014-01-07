var base = "views/directiveTemplates/";
angular.module("directives", [])




/*

.directive('loginDetails', function () {
      return {
         restrict: "A",
         replace: true,
         scope:{
             number : "@number"
         },
         templateUrl:"views/directiveTemplates/loginDetails.html" 
        }
     })

*/

.directive('expander', function(){
     return{
        restrict: 'A',
        scope:{

        },
        link: function(scope, elm, attrs){

         }
    };

})
//div(data-ng-controller="ResultsController")
			//div(data-ng-repeat="item in items", data-ng-click="url = item")
				//span(data-ng-hide="url") Click to load
				//div(data-ng-include="url")
				//app.directive( 'directiveOne', function () {
  //return {
    //controller: 'MyCtrl'
  //};
//});

			//div(data-ng-repeat="item in items", data-ng-click="url = item")
				//span(data-ng-hide="url") Click to load
				//span(data-ng-show="url") Loaded item {{url})
				//div(data-ng-include="url")
		//a.more(data-ng-click="showMore()") Show More
//$scope.moreTemp = '<div moreresults class="responses"><ul><li>' + value.T + '</li><li>' + value.S + '</li></ul></div>';   
.directive('moreresults', function(){
    return{
        restrict: "A",
        link: function(scope, elm, attrs){
        	var valueT = "one";
        	var valueS = "two";
       },
        template:'<div moreresults class="responses"><ul><li>' + valueT + '</li><li>' + valueS + '</li></ul></div>',
    };
})



                                          
