angular.module("globalConfig", [])

.config(['$provide','$httpProvider','$compileProvider', function($provide, $httpProvider, $compileProvider) {
			var check;
			var token;
			$httpProvider.responseInterceptors.push(['$timeout','$q', 'message','$location', '$window', function($timeout, $q, message,$location, $window){
			var redirectTo = {
				Error: function() {
					$location.path("/Error")
				}
			};
				return function(promise) {
					var a = sessionStorage.id;
					return promise.then(function(response) {
						$httpProvider.defaults.headers.get= {
							'Accept' : 'application/json, text/javascript, */*'
						}
						$httpProvider.defaults.headers.post= {
							'Accept' : 'application/json, text/javascript, */*',
							"Content-Type" : "application/json; charset=utf-8"
						}
						$httpProvider.defaults.headers.put = {
							'Accept' : 'application/json, text/javascript, */*',
							"Content-Type" : "application/json; charset=utf-8"
						}
						return promise
					},
							function(errorResponse) {
								sessionStorage.clear()
								switch(errorResponse.status){
									case 404:
									sessionStorage.err= errorResponse.status;
										$timeout(redirectTo.Error, 1000);
										break;
									case 500:
										sessionStorage.err= errorResponse.status;
										$timeout(redirectTo.Error, 1000);
										break;
									default:
										showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data, 'errorMessage', 20000);
								}
								return $q.reject(errorResponse);
							});
				};
			}]);
}]); 