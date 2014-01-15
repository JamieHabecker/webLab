angular.module("globalFactories", [])

.factory('complete', function(){
			if(sessionStorage.complete === "yes"){
				return true;
			}else{
				return false;
			}
})

.factory('results', function() {
			var resultData = {};
			return resultData;
})

.factory('StateFactory',['$resource', function($resource) {
		var dev = window.location.protocol + "//" + window.location.host + "/";
		var baseUrl = dev + "models/states.json";
			return $resource(baseUrl, {}, {
				menu: {
					method : 'GET',
					isArray : true,
					url : baseUrl
				}
			});
}])


.animation('.an-enter', function() {
			return {
				setup : function(myElement) {
					myElement.css({ 'opacity': 0.3 });
					return {}; //if you want to share some dat between the set and start return it it can be anything
				},
				start : function(myElement, done, data) {
					myElement.animate({
						'opacity' : 1
					}, 300, function(){
						done();
					});
				}
			}
})

.animation('.siteAnime', function() {
	return {
		enter : function(element, done) {
			jQuery(element).animate({
				opacity:1
			},300, function(){
				done()
			});


		},

		leave : function(element, done) {
			jQuery(element).animate({
				opacity:0
			},300, function(){
				done();
			});
		}
	};
})



















.animation('.mobi', function() {
	return {
		beforeAddClass : function(ele, className, done) {
			$(ele).stop().slideUp('slow');
			$('body,section.site,div.mobi').removeClass('mobiMenuShowing')
		},
		beforeRemoveClass : function(ele){
			$(ele).stop().slideDown('slow').removeClass('ng-hide');
			$('body,section.site,div.mobi').addClass('mobiMenuShowing')

		}
	};
})




.factory('ContactFactory',['$resource', function($resource) {
			var baseUrl = "//10.156.147.131/dmvForms/default.aspx/SendSearchAttributes";
			//var baseUrl= "http://search.dmv.virginia.gov/search?mode=allwords&reload=1&debug=1&client=dmvnow_front&proxystylesheet=dmvnew_front&output=xml_no_dtd&site=default_collection&q=test&proxyreload=1&btnSearch=Search";
			return $resource(baseUrl, {}, {
				contactInfo : {
					method : 'GET',
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