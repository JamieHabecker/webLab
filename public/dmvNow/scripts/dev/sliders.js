angular.module("sliders", [])

.directive('diesel',['$timeout',function($timeout){
			return {
				restrict: 'EA',
				template: '<li data-ng-include="\'/views/sliders/dieselTax.html\'"></li>',
				link: function(scope,ele,attr){
					scope.isloading= true;
					$timeout(function(){
						$('.flexslider').flexslider({
							animation: "slide",
							slideshow: false
						});
					},1000);
				}
			}
}])


.directive('moped',function(){
			return {
				restrict: 'EA',
				template: '<li data-ng-include="\'/views/sliders/moped.html\'"></li>',
				link: function(scope,ele,attr){
				}
			}
})

		.directive('grandad',function(){
			return {
				restrict: 'EA',
				template: '<li data-ng-include="\'/views/sliders/grandad.html\'"></li>'
				}
		})



