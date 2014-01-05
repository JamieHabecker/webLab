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


.directive('placeholder', ['$timeout', function($timeout){
      if (navigator.userAgent.indexOf("MSIE") < 0) {
        return{
            
        }
    }
   if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
       var s = new Number(RegExp.$1);
       if (s > 10) {
           return
           }else{
               return {
                   link: function(scope, elm, attrs){
                       if (attrs.type === 'password'){
                           return;
                           }
                           $timeout(function(){
                               elm.val(attrs.placeholder).focus(function(){
                                   if ($(this).val() == $(this).attr('placeholder')) {
                                       $(this).val('');
                                       }
                                       }).blur(function(){
                                           if ($(this).val() == ''){
                                               $(this).val($(this).attr('placeholder'));
                                               }});});
                                          }}}}}])
                                          
                                          


.directive('button', function(){
    return{
        restrict: 'E',
        compile: function(element, attributes){
            element.addClass('orgBtn')
        }
    };
})

.directive('blubtn', function(){
    return{
        restrict: 'A',
        compile: function(element, attributes){
            element.addClass('bluBtn')
        }
    };
})



 
.directive('portalcancel', function(){
    return{
        restrict: 'E',
        templateUrl:base + 'portalCancel.html',
        replace: true 
    };
})

/*

.directive('firstname', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "firstName.html",
         link: function(scope, elm, attrs){
         }
    };
})


.directive('lastname', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "lastName.html",
         link: function(scope, elm, attrs){
         }
    };
})


.directive('email', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "email.html",
         link: function(scope, elm, attrs){
         }
    };
})

.directive('phone', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "phone.html",
         link: function(scope, elm, attrs){
         }
    };
})

.directive('suffix', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "suffixSelect.html",
         link: function(scope, elm, attrs){
            
         }
    };
})


.directive('subject', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "subjectSelect.html",
         link: function(scope, elm, attrs){
            
         }
    };
})
*/
/*
.directive('titlenumber', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "title.html",
         link: function(scope, elm, attrs){
         }
    };
})

*/

.directive('custnumber', ['$parse',function($parse, $templateCache){
    return{
        restrict: "A",
        link: function(scope, elm, iAttrs, controller) {
            var a = $('input').attr('name');
            scope.$watch(a, function(value) {
                if (!value) {
                    return;
                }
                if(value.indexOf("-") !==-1 && value.length === 11){
                     $parse(a).assign(scope, value.replace(/-/g, ''));
                }
            });
        }
    }
}])




/*

.directive('vin', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "vin.html",
         link: function(scope, elm, attrs){
         }
    };
})




.directive('description', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + 'description.html'
    }
})




.directive('yesno', function(){
    return{
        restrict: "E",
        replace: true,
          templateUrl:base + 'yesnoRadio.html'
        
    };
});

*/