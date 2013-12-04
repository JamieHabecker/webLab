angular.module("directives", [])


.directive('attempts', function () {
			return {
				restrict: "A",
				replace:true,
				template:"<div><p style='font-weight:bold;font-size:1em;'>{{attemps}}</p></div>"
			}
})
