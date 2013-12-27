var base = "views/directiveTemplates/";
angular.module("directives", [])





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









.directive('subject', function(){
    return{
        restrict: "E",
        replace: true,
        templateUrl:base + "subjectSelect.html",
         link: function(scope, elm, attrs){

         }
    };
})


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











