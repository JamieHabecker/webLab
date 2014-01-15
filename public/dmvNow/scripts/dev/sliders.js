angular.module("sliders", [])

.directive('diesel', function($timeout){
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
})
		
.directive('d', function($timeout){
			return {
				restrict: 'EA',
				template: '<li data-ng-include="\'/views/sliders/dieselTax.html\'"></li>',
				link: function(scope,ele,attr){
				}
			}
})



