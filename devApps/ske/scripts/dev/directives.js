angular.module("directives", [])


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
