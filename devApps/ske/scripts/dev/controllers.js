angular.module("KnowledgePortal", ['ngResource','directives','dmvPortalConfig','globals','factories']).value('$anchorScroll', angular.noop)




.config(['$routeProvider','$locationProvider','$httpProvider', function($routeProvider,$locationProvider, $httpProvider){
     $httpProvider.defaults.headers.get = {
        'Accept' : 'application/json, text/javascript, */*'
   };
    $routeProvider
    .when('/SampleKnowledgeExam', {
        controller : 'SKEController',
        templateUrl : 'views/skeMenu.html'
    })
    .when('/DriversLicense:Part1-Traffic Signs', {
        controller : 'SignsController',
        templateUrl : 'views/exam10.html'
    })
    .when('/DriversLicense:Part2-General Knowledge', {
        controller : 'SignsController',
        templateUrl : 'views/exam10.html'
    })
    .when('/Motorcycle License', {
        controller : 'SignsController',
        templateUrl : 'views/exam10.html'
    })
     .when('/Dealer Salesperson License', {
        controller : 'SignsController',
        templateUrl : 'views/exam10.html'
    })
     .when('/Commercial License', {
        controller : 'SignsController',
        templateUrl : 'views/exam10.html'
    })
     .when('/Dealer/Operator License', {
        controller : 'SignsController',
        templateUrl : 'views/exam10.html'
    })
    .when('/Complete', {
        controller : 'AnswersController',
        templateUrl : 'views/complete.html'
    })
    .otherwise({
        redirectTo : '/SampleKnowledgeExam'
    });

}])



.controller('SKEController',['$scope','$rootScope','knowledgeFactory','$location','numberWrong','questionsMissed','theExam', function($scope,$rootScope,knowledgeFactory,$location,numberWrong,questionsMissed,theExam) {
    $scope.isloading = false;
    $rootScope.attempts = false;
    sessionStorage.removeItem("type");
    numberWrong.length = 0;
    questionsMissed.length = 0;
    $scope.signs = function(){
        sessionStorage.type ="S";
        $location.path("/DriversLicense:Part1-Traffic Signs")
    };
    $scope.general = function(){
            sessionStorage.type ="K";
            $location.path("/DriversLicense:Part2-General Knowledge")
    };
    $scope.motorcycle = function(){
            sessionStorage.type ="M";
            $location.path("/Motorcycle License");
        };
    $scope.dealerSales = function(){
            sessionStorage.type ="D";
            $location.path("/Dealer Salesperson License");
    };
    $scope.commercial = function(){
            sessionStorage.type ="C";
            $location.path("/Commercial License");
        };
    $scope.dealerOperator = function(){
            sessionStorage.type ="O";
            $location.path("/Dealer/Operator License")
    };
}])





.controller('SignsController',['$scope','$rootScope','knowledgeFactory','$location','numberWrong','questionsMissed','theExam', function($scope,$rootScope,knowledgeFactory,$location,numberWrong, questionsMissed, theExam) {
        var type =  sessionStorage.type;
        var attempts = [1,1,1];
        if(!type){
           $location.path("/SampleKnowledgeExam")
        }
        var data ={
         "TT":{
             "testType": type //K S D O M C 
         }
        };
        $('label').removeClass("selected");
        $scope.isloading = false;
        numberWrong.length = 0;
        questionsMissed.length = 0;
        $('div.attempts').css("background","#72E587");
        $scope.one = true;
        sessionStorage.attempts = attempts.length;
        $rootScope.attempts = "You are allowed " + attempts.length + " wrong answers!";
        $scope.data = data;
        switch(true){
        case type === "S" : $scope.type = "Driver's License: Part 1 - Traffic Signs";
          _gaq.push(['_trackEvent', 'Drivers License Part 1 Traffic Signs', 'SKE']);
        break;
        case type === "K" : $scope.type = "Driver's License: Part 2 - General Knowledge";
          _gaq.push(['_trackEvent', 'Drivers License Part 2 General Knowledge', 'SKE']);
        break;
        case type === "M" : $scope.type = "Motorcycle License";
          _gaq.push(['_trackEvent', 'Motorcycle License', 'SKE']);
        break;
        case type === "D" : $scope.type = "Dealer Salesperson License";
          _gaq.push(['_trackEvent', 'Dealer Salesperson License', 'SKE']);
        break; 
        case type === "C" : $scope.type = "Commercial License";
             _gaq.push(['_trackEvent', 'Commercial Drivers License', 'SKE']);
        break;
        case type === "O" : $scope.type = "Dealer/Operator License";
         _gaq.push(['_trackEvent', 'Dealer/Operator License', 'SKE']);
        break;
        
    }
    knowledgeFactory.skeQuestions({}, $scope.data, successcb, errorcb);
    
    
    function successcb(data){
			console.log(data)
    $scope.questions = true;
    $scope.one = data.lQuestionansAnswers[0];
    $scope.two = data.lQuestionansAnswers[1];
    $scope.three = data.lQuestionansAnswers[2];
    $scope.four = data.lQuestionansAnswers[3];
    $scope.five = data.lQuestionansAnswers[4];
    $scope.six = data.lQuestionansAnswers[5];
    $scope.seven = data.lQuestionansAnswers[6];
    $scope.eight = data.lQuestionansAnswers[7];
    $scope.nine = data.lQuestionansAnswers[8];
    $scope.ten = data.lQuestionansAnswers[9];
    
    $scope.q = function(y, i, z){
        var right;
        var x = "q" + (y + 1);
        var el = $("div.question" + z);
        var nexEl = $("div.question" + (z + 1));
        if(z === 10){
            nexEl = "summary";
        }
        var c = i;
        var answer =  c[y].CorrectAnswer;
        angular.forEach(c, function(value, key){
        if(value.CorrectAnswer === true){
            right = key;
        }
    });
    setAnimate(x,answer, el, nexEl,right, z);
  };
 }
    
    
    
 function errorcb(data) {
        $scope.err = data.status
    }
    
    
    function setAnimate(x,answer, el, nexEl, right, z){
			console.log(nexEl)
       var r = right + 1;
       var x = "." + x;
       var a = $(".q" + r);
       var totalWrong;
       var n;
       var scroll = function() {
           var e = $("html,body");
           id = $("body.knowledgePortal");
           e.animate({scrollTop: $(id).offset().top}, "fast");
           return false;
    };
       if(answer === true){
           if(sessionStorage.attempts == -1){
                $location.path('/Complete')
            }
           $(x).addClass("selected");
           $("label:not(.selected) > input").prop('disabled', true);
           $('label' + x + ' > span').text("Correct Answer")
           if(nexEl === "summary"){
               $location.path("/Complete")
           }else{
               setTimeout(function(){
               el.fadeOut(500, function(){
                   nexEl.fadeIn(500);
                   $('label').removeClass("selected").css({"opacity" : "1"});
                   $("input").prop('disabled',false);
                    $('label > span').text("")
                   }); 
                   $('li,label').removeClass("wrong");
               }, 800);
             }
      }else{
            numberWrong.push(1);
            totalWrong = numberWrong.length;
            attempts.pop();
            n = attempts.length;
            sessionStorage.attempts = n;
            $(x).addClass("wrong");
            $scope.right = ".q" + r;
           
            $("label.theQ").addClass('selected');
            if(n === 0){
                $('label.wrong > span').text(" Sorry, you've failed.")
            }else{
                $('label.wrong > span').text(" Incorrect - " + n + " wrong answers remaining")
            }
             
            $("label:not(.selected) > input").prop('disabled', true);
            //scroll();
           
            setTimeout(function(){
                 $(a).addClass("selected");
             $("label.selected > input").prop('disabled', false);
             $('label.q' + r + ' > span').text("Correct Answer - Click to continue")
            //$(x).removeClass('wrong').addClass("removeWrong");
            $("label:not(.selected)").fadeTo( "slow" , 0.5, function() {
                  });
            }, 800)
             
       }
       
     if(n === 2){
                $rootScope.attempts = n + " wrong answers remaining"
                $("div.attempts").css("background" , "yellow")
        }else if(n === 1){
                $rootScope.attempts = n + " wrong answer remaining";
                $("div.attempts").css("background" , "#F97777")
            }else if(n === 0){
                $rootScope.attempts = "Sorry, you've failed";
                sessionStorage.attempts = -1
                
            }
            if(n === -1){
                    $location.path('/Complete');
            }
           
      
          
    }
}])









.controller('AnswersController',['$scope','numberWrong','$location', function($scope, numberWrong, $location){
    var type = sessionStorage.type;
    var total = numberWrong.length;
    var attempts = sessionStorage.attempts;
    $('div.attempts').hide();
    $scope.total = 10 - total;
    if(attempts == -1){
        $scope.correct = false;
    }else{
        $scope.correct = true;
    }
    
         if(type === "S" || type === "K"){
             $scope.S = true;
         }
         if(type === "M"){
              $scope.M = true;  
         }
          if(type === "D" || type === "O"){
              $scope.D = true;
         }
         if(type === "C"){
              $scope.C = true;
         }
    
     switch(true){
        case type === "S" : $scope.type = "DriversLicense: Part 1-Traffic Signs"
        break;
        case type === "K" : $scope.type = "DriversLicense: Part 2-General Knowledge"
        break;
        case type === "M" : $scope.type = "Motorcycle License"
        break;
        case type === "D" : $scope.type = "Dealer Salesperson License"
        break; 
        case type === "C" : $scope.type = "Commercial License"
        break;
        case type === "O" : $scope.type = "Dealer/Operator License"
        break;
        
    }
    $scope.mainMenu = function(){
        $location.path("/SampleKnowledgeExam")
    };
    $scope.driversManual = function(){
         window.location.replace("/drivers/#manual.html")
    };
    $scope.motorcycle = function(){
       window.location.replace("/webdoc/pdf/dmv2.pdf")
    };
    $scope.manualS = function(){
        window.location.replace("/drivers/#manual_s.html")
    };
    $scope.dealerM = function(){
        window.location.replace("/webdoc/pdf/dealer_manual.pdf")
    };
    $scope.commercial = function(){
        window.location.replace("/drivers/#cdlmanual.html")
    };
    $scope.dealerG = function(){
        window.location.replace("/webdoc/pdf/mvdb35.pdf")
    };
    
    $scope.tryAgain =  function(){
        switch(true){
        case type === "S" : 
         _gaq.push(['_trackEvent', 'Drivers License Part 1 Traffic Signs -- Try Again', 'SKE']);
         $location.path("/DriversLicense:Part1-Traffic Signs");
        break;
        case type === "K" : 
          _gaq.push(['_trackEvent', 'Drivers License Part 2 General Knowledge -- Try Again', 'SKE']);
          $location.path("/DriversLicense:Part2-General Knowledge");
        break;
        case type === "M" : 
         _gaq.push(['_trackEvent', 'Motorcycle License -- Try Again', 'SKE']);
         $location.path("/Motorcycle License");
        break;
        case type === "D" : 
          _gaq.push(['_trackEvent', 'Dealer Salesperson License -- Try Again', 'SKE']);
          $location.path("/Dealer Salesperson License");
        break; 
        case type === "C" : 
          _gaq.push(['_trackEvent', 'Commercial Drivers License -- Try Again', 'SKE']);
          $location.path("/Commercial License");
        break;
        case type === "O" : 
          _gaq.push(['_trackEvent', 'Dealer/Operator License -- Try Again', 'SKE']);
          $location.path("/Dealer/Operator License");
        break;
        };
    };
    
    
    
}])



.controller('PortalCancelController',['$scope', function($scope){
    $scope.portalCancel = function(){
        window.location.replace("/");
    };
    
}])

.animation('an-enter', function() {
	return {
		setup : function(myElement) {
			myElement.css({ 'opacity': 0.3 });
			return {}; //if you want to share some dat between the set and start return it it can be anything
		},
		start : function(myElement, done, data) {
			myElement.animate({
				'opacity' : 1
			}, 300, function(){
				done()
			});
		}
	}
})




