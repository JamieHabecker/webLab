angular.module("directives", [])

.directive('calicon', function(){
	return{
		restrict: 'EA',
		scope:{
			eventDate: '=event'
		},
		template:'<div ng-show="eventDate" class="calHolder"><ul><li>{{eventDate | date:"EEEE"}}</li><li>{{eventDate | date:"MMMM"}}</li><li>{{eventDate | date:"d"}}</li></ul></div>'
	};
})


.directive('day', function(){
	return{
		restrict: 'A',
		scope:{
			events: '=events'
		},
		template: '<div class="events"><div ng-show="events" class="calHolder"><ul><li>{{events | date:"EEEE"}}</li><li>{{events | date:"MMMM"}}</li><li class="day">{{events | date:"d"}}</li></ul></div>',
		replace: true
	};
})

.directive('eventlist', function(){
	return{
		restrict: 'EA',
		template: '<table ng-show="event.E_City">' +
				'<th><a href="https://maps.google.com/?q={{event.E_Street}},{{event.E_Zip}},{{event.E_City}},VA">{{event.E_Sitename}} &nbsp;&nbsp;{{event.E_Hours}}</a></th>' +
				'<tr><td><a href="https://maps.google.com/?q={{event.E_Street}},{{event.E_Zip}},{{event.E_City}},VA">{{event.E_City}}, {{event.E_Street}}, {{event.E_Zip}}</a>' +
				'<span ng-show="event.E_Notes">* {{event.E_Notes}}</span></td>' +
				'</tr></table>'
	};
})

.directive('contentheader', function(){
			return{
				restrict: 'EA',
				template: '<h1><span style="padding-right:1em;"><a href="/"><</a></span>{{title}}</h1>',
				replace:true,
				link: function(scope,ele,attr){
					scope.title= attr.title;
				}
			}
		})
.directive('related1', function(){
			return{
			restrict: 'EA',
			template: '<article class="related g4"><h3>Related Info One</h3></article>',
			replace:true
			}
})

		.directive('related2', function(){
			return{
				restrict: 'EA',
				template: '<article class="related g4"><h3>Related Info Two</h3></article>',
				replace:true
			}
		})












/*



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


*/
                                          
