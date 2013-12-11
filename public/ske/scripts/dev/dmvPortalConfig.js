angular.module("dmvPortalConfig", [])

.config(['$provide','$httpProvider','$compileProvider', function($provide, $httpProvider, $compileProvider) {
    var check;
    var y = window.location.host;
    var elementsList = $();
    var token;
    var showMessage = function(content, cl, time, loading) {
        var a = loading;
        $('<h2>').addClass('message').addClass(cl).appendTo(elementsList).text(content);
    };
    $httpProvider.responseInterceptors.push(['$timeout','$q', 'message','$location', '$window', function($timeout, $q, message,$location, $window){
         var redirectTo = {
        SampleKnowledgeExam: function() {
            $location.path("/SampleKnowledgeExam")
        }
    };
        
        return function(promise) {
            var a = sessionStorage.id;
            if ($('div.messagesList').length) {
                $('div.messagesList').empty();
                showMessage('Loading...', 'loadingMessage', 50000);
            } else {
                showMessage('Loading...', 'loadingMessage', 50000);
            }
            return promise.then(function(response) {
                if (response) {
                    $('h2.loadingMessage').fadeOut(1040);
                }
                check = response.headers('x-auth-token');
                if (check !== null && check !== undefined) {
                    token = response.headers('x-auth-token');
                    sessionStorage.id = token;
                    credStore.push(token);
                    var toke = credStore.shift();

                    $httpProvider.defaults.headers.common = {
                        "X-Auth-Token" : toke

                    };
                    $httpProvider.defaults.headers.common = {
                        'Accept' : 'application/json, text/plain, * / *'
                    };

                }

                if (a) {

                    $httpProvider.defaults.headers.get = {
                        'Accept' : 'application/json, text/javascript, */*',
                        'X-Auth-Token' : a

                    }
                    
                    $httpProvider.defaults.headers.post = {
                        'Accept' : 'application/json, text/javascript, */*',
                        "Content-Type" : "application/json; charset=utf-8",
                        'X-Auth-Token' : a

                    }
                     $httpProvider.defaults.headers.put = {
                        'Accept' : 'application/json, text/javascript, */*',
                        "Content-Type" : "application/json; charset=utf-8"

                    }
                }
                return promise

            }, function(errorResponse) {
                var e = errorResponse.data;
                switch(errorResponse.status){
                    case 404:
                        $('div.messagesList').empty();
                        sessionStorage.clear()
                        showMessage(e.STATUS, 'errorMessage', 20000);
                        $timeout(redirectTo.SampleKnowledgeExam, 2000);
                        break;
                    case 500:
                        $('div.messagesList').empty();
                        sessionStorage.clear()
                        showMessage(e.STATUS, 'errorMessage', 20000);
                        $timeout(redirectTo.SampleKnowledgeExam, 2000);
                        break;
                    default:
                        showMessage('Error ' + errorResponse.status + ': ' + errorResponse.data, 'errorMessage', 20000);
                }
                return $q.reject(errorResponse);
            });
        };
    }]);
    $compileProvider.directive('appMessages', function() {
        var directiveDefinitionObject = {
            restrict : 'A',
            template : "<div></div>",
            replace : true,
            link : function(scope, element, attrs) {
                elementsList.push($(element));
            }
        };
        return directiveDefinitionObject;
    });

}]); 