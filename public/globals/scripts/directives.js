angular.module("globals", ['globalConfig','globalFactories', 'globalControllers'])


.directive('states',['StateFactory',function(StateFactory){
			return{
				restrict: "AE",
				template: "<div data-ng-form='stateFrm'><label>State<span class='reqText' data-ng-show='stateReq'>Required</span></label><select data-ng-model='state' data-ng-change='setState()' data-ng-options='c.State for c in states'><option value=''>{{current}}</option></select></div>",
				link: function(scope, elm, attr){
					scope.stateReq= false;
					var num= attr.num;
					if(sessionStorage.getItem("state" + num)){
						scope.current= sessionStorage.getItem("state" + num);
					}else{
						scope.current = "Virginia";
						sessionStorage.setItem("stateCode" + num, "VA");
						sessionStorage.setItem("state" + num, "Virginia");
					}
					scope.setState = function(){
						if(scope.state !== null){
							sessionStorage.setItem("state" + num, scope.state.State);
							sessionStorage.setItem("stateCode" + num, scope.state.code);
						}else{
							scope.current = "Virginia";
							sessionStorage.setItem("stateCode" + num, "VA");
							sessionStorage.setItem("state" + num, "Virginia");
						}
					}
						if(attr.req){
							scope.stateReq = true;
						}
					StateFactory.menu({},{}, statescb, stateserr);
					function statescb(data){
						scope.states = data;
					}
					function stateserr(err){
						console.log(err)
					}
				}
			};
}])


.directive('vanav',[ function() {
			return {
				restrict: 'EA',
				template: "<ul class='vaNav'><li><a href='http://www.virginia.gov'><img src='/img/vaLogo.jpg'/></a></li>" +
				"<li class='one'><a href='http://www.virginia.gov/government/state-employees/agency-directory' title='Virginia agency websites'>Agencies</a></li>" +
				"<li class='two'><a href='http://www.governor.virginia.gov' title='Virginia Governor'>Governor</a></li>" +
				"<li class='five'><a href='http://www.virginia.gov/search' title='Search Virginia.gov'>Search Virginia.gov</a></li></ul>",
				replace: true
			};
}])

.directive('plainheader', function() {
			return {
				restrict: 'EA',
				template: "<header class='dmvHeader g16'><div class='logo first'><a href='/'><img src='/img/dmvLogo.png' alt='DMV HOME' /></a></div></header>",
				replace: true
			};
})


.directive('mainheader', function(){
			return{
				restrict: 'EA',
				template:"<header class='dmvHeader g16'><div class='logo first'><a href='/'><img src='/img/dmvLogo.png' alt='DMV HOME' /></a></div>" +
						"<div class='subNav'>" +
						"<div class='login'><button>Log In</button></div>" +

						"<div class='search' data-ng-controller='SearchController'><ul><li><input type='text' name='search' data-ng-model='searchIn' placeholder='Search DMV'/></li><li><a class='bluBtn' data-ng-click='search()'>Search</a></li></div>"+
						"<div class='subLinks'><a href='/'>Create Account</a><a href='/'>News</a><a href='/'>About DMV</a><a href='/'>Contact Us</a></div></div>"+
						"<div class='mainNavHold' data-ng-controller='MainNavigationController'><div class='mobMainNav mob'>" +
						"<select data-ng-model='color' data-ng-options='c.x for c in menuLinks'>" +
						"<option value=''>Choose a service area</option></select></div><div class='mainNav'>" +
						'<ul class="mainNavLinks" rest><li ng-repeat="links in menuLinks.slice(0,8)"><a ng-click="next(\'{{links.link}}\')">{{links.x}}</a></li></ul></div></div></header>'
			}
		})


//<input type='text' name='search' data-ng-model='searchIn' placeholder='Search DMV'/>


.directive('weblabheader', function() {
			return {
				restrict: 'EA',
				template: "<header class='webLabHeader g16'><h1>WebLab</h1></header>",
				replace: true
			};
})

.directive('btn', function(){
			return{
			restrict: 'A',
			template: '<button data-ng-disabled="{{formName}}.$invalid || dis === \'true\'" data-ng-show="!isloading" data-ng-click="next()">{{action}}</button>',
			replace: true,
			link: function(scope,ele,attr){
				scope.action= attr.act;
				scope.dis= attr.dis;
				if(attr.formname){
					scope.formName= attr.formname;
				}else{
					scope.formName= "form"
				}
			}
			}
	})


.directive('button', function(){
			return{
				restrict: 'E',
				compile: function(element, attributes){
					element.addClass('orgBtn')
				}
			};
})

.directive('mod', function(){
			return{
				restrict: 'EA',
				template: '<script src="shims/mod.min.js"></script>',
				replace: true,
				link: function(scope,ele,attr){
					scope.isloading= false;
				}
			}
})


.directive('loader', function(){
			return{
				restrict: 'A',
				template: '<h2 class="loaderText" data-ng-show="isloading">Submitting...</h2>',
				replace: true,
				link: function(scope,ele,attr){
					scope.isloading= false;
				}
			}
})


.directive('zip', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='zi'><label>Zip<span class='reqText' data-ng-show='zipReq'>Required</span></label><input type='text' name='zip' data-ng-model='zip' data-ng-pattern='zipR' data-ng-required='zipReq' placeholder='ZIP'>" +
						"<p data-ng-show='zi.zip.$invalid && zi.zip.$dirty'>You must enter a zip code</p></div>",
				link: function(scope,ele,attr){
						scope.zipR= /^\d{5}$/;
					scope.zipReq= false;
						if(attr.req){
							scope.zipReq= true;
						}
				}
			}
		})

.directive('year', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='vy'><label>Year<span class='reqText' data-ng-show='yearReq'>Required</span></label><input type='text' name='vyear' data-ng-model='vyear' data-ng-pattern='vyearR' data-ng-required='yearReq' placeholder='YYYY'>" +
						"<p data-ng-show='vy.vyear.$invalid && vy.vyear.$dirty'>You must enter the vehicle year</p></div>",
				link: function(scope,ele,attr){
				scope.vyearR= /^(19|20)\d{2}$/;
					scope.yearReq= false;
					if(attr.req){
						scope.yearReq= true;
					}
				}
			}
})

.directive('vehtitle', function(){
			return{
				restrict:'AE',
				template: '<div data-ng-form="vehtitleFrm"><label>Vehicle Title Number<span class="reqText" data-ng-show="vehtitleReq">Required</span></label>' +
						'<input type="text"  name="title" ng-minlength="8" ng-maxlength="10" ng-model="title" data-ng-required="vehtitleReq" data-ng-pattern="vehtitleR"  placeholder="Title">' +
						'<p ng-show="vehtitleFrm.title.$invalid && vehtitleFrm.title.$dirty">You must enter a valid title number</p></div>',
				link: function(scope,ele,attr){
					scope.vehtitleR= /^\d+$/;
					scope.vehtitleReq= false;
					if(attr.req){
						scope.vehtitleReq= true;
				}
		}
	}
})
.directive('plate', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='vp'><label>Plate<span class='reqText' data-ng-show='plateReq'>Required</span></label><input type='text' data-ng-maxlength='8' name='vplate' data-ng-model='vplate' data-ng-maxlength='8' data-ng-required='plateReq' placeholder='License Plate'>" +
						"<p data-ng-show='vp.vplate.$invalid && vp.vplate.$dirty'>You must enter the vehicle license plate</p></div>",
				link: function(scope,ele,attr){
					scope.plateReq= false;
					if(attr.req){
						scope.plateReq= true;
					}
				}
			}
})

.directive('pcolor', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='primcolor'><label>Primary Color<span class='reqText' data-ng-show='pcolorReq'>Required</span></label><input type='text' name='vpc' data-ng-model='vpc' data-ng-required='pcolorReq' placeholder='Primary Color'>" +
						"<p data-ng-show='primcolor.vpc.$invalid && primcolor.vpc.$dirty'>You must enter the vehicle primary color</p></div>",
				link: function(scope,ele,attr){
					scope.pcolorReq= false;
					if(attr.req){
						scope.pcolorReq= true;
					}
				}
			}
})

.directive('scolor', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='vcs'><label>Secondary Color<span class='reqText' data-ng-show='scolorReq'>Required</span></label><input type='text' name='vsc' data-ng-model='vsc' data-ng-required='scolorReq' placeholder='Secondary Color'>" +
						"<p data-ng-show='vcs.vsc.$invalid && vcs.vsc.$dirty'>You must enter the vehicle secondary color</p></div>",
				link: function(scope,ele,attr){
					scope.scolorReq= false;
					if(attr.req){
						scope.scolorReq= true;
					}
				}
			}
})

.directive('model', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='mo'><label>Model<span class='reqText' data-ng-show='modelReq'>Required</span></label><input type='text' data-ng-required='modelReq' name='vmodel' data-ng-model='vmodel' placeholder='Model'>" +
						"<p data-ng-show='mo.vmodel.$invalid && mo.vmodel.$dirty'>You must enter the vehicle model</p></div>",
				link: function(scope,ele,attr){
					scope.modelReq= false;
					if(attr.req){
						scope.modelReq= true;
					}
				}
			}
})

.directive('firstname', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='fi'><label>First Name<span class='reqText' data-ng-show='fname'>Required</span></label><input type='text' data-ng-required='fname' name='fn' data-ng-model='fn' placeholder='First Name'>" +
						"<p data-ng-show='fi.fn.$invalid && fi.fn.$dirty'>You must enter a first name</p></div>",
				link: function(scope, ele, attr){
					scope.fname= false;
					if(attr.req){
						scope.fname = true;
					}
				}
			}
})

.directive('lastname', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='la'><label>Last Name<span class='reqText' data-ng-show='lname'>Required</span></label><input type='text' data-ng-required='lname' name='lastname' data-ng-model='lastname' placeholder='Last Name'>" +
						"<p data-ng-show='la.lastname.$invalid && la.lastname.$dirty'>You must enter a last name</p></div>",
				link: function(scope, ele, attr){
					scope.lname = false;
					if(attr.req){
						scope.lname = true;
					}
				}
			}
})

.directive('custnumber',function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='cnfrm'><label>Driver's License Number or SSN<span class='reqText' data-ng-show='custnumReq'>Required</span></label><input type='text' data-ng-required='custnumReq' name='customernumber' data-ng-model='customernumber' data-ng-pattern='custnumR' placeholder='Customer Identifier'>" +
						"<p data-ng-show='cnfrm.customernumber.$invalid && cnfrm.customernumber.$dirty '>You must enter a customer identifier</p></div>",
				link: function(scope, ele, attr){
					scope.custnumR= /^([a-zA-Z0-9\-]{9}|[a-zA-Z0-9\-]{11})+$/;
					scope.custnumReq = false;
					if(attr.req){
						scope.custnumReq = true;
					}
				}
			}
})

.directive('address', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='add'><label>Address<span class='reqText' data-ng-show='addressReq'>Required</span></label><input type='text' name='address' data-ng-model='address' data-ng-required='addressReq' placeholder='Address'>" +
						"<p data-ng-show='add.address.$invalid && add.address.$dirty'>You must enter an address</p></div>",
				link: function(scope, ele, attr){
					scope.addressReq= false;
					if(attr.req){
						scope.addressReq= true;
					}
				}
			}
})

.directive('email', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='em'><label>Email<span class='reqText' data-ng-show='emailReq'>Required</span></label><input type='text' name='email' data-ng-model='email' data-ng-required='emailReq' data-ng-pattern='emailR' placeholder='Email'>" +
				"<p data-ng-show='em.email.$invalid && em.email.$dirty'>You must enter an email</p></div>",
				link: function(scope, ele, attr){
					scope.emailR= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					scope.emailReq= false;
					if(attr.req){
						scope.emailReq= true;
					}
				}
		}
})

.directive('phone',function(){
			return{
				restrict:'AE',
				template:"<div data-ng-form='ph'><label>Phone<span class='reqText' data-ng-show='phoneReq'>Required</span></label><input type='text' name='phone'  data-ng-model='phone' data-ng-required='phoneReq' data-ng-pattern='phoneR' placeholder='555-555-1212'>" +
				"<p data-ng-show='ph.phone.$invalid && ph.phone.$dirty'>You must enter a valid phone number (ex.555-555-1212)</p></div>",
				link: function(scope, ele, attr){
					scope.phoneR= /^\d{3}-\d{3}-\d{4}$|^\d{10}$/;
					scope.phoneReq= false;
					if(attr.req){
						scope.phoneReq= true;
					}
				}

		}
		})

.directive('city', function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='ci'><label>City<span class='reqText' data-ng-show='cityReq'>Required</span></label><input type='text' name='city' data-ng-model='city' data-ng-required='cityReq' placeholder='City'>" +
						"<p data-ng-show='ci.city.$invalid && ci.city.$dirty'>You must enter a city</p></div>",
				link: function(scope, ele, attr){
					scope.cityReq= false;
					if(attr.req){
						scope.cityReq = true;
					}
				}
			}
})


.directive('make', function(){
			return{
				restrict: "AE",
				template:"<div data-ng-form='make'><label>Make<span class='reqText' data-ng-show='makeReq'>Required</span></label><input type='text' name='vmake' data-ng-model='vmake' data-ng-required='makeReq' placeholder='Company Name'>" +
						"<p data-ng-show='make.vmake.$invalid && make.vmake.$dirty'>You must enter the vehicle make</p>",
				link: function(scope, ele, attr){
					scope.makeReq= false;
					if(attr.req){
						scope.makeReq= true;
					}
				}
			}
		})

.directive('compname', function(){
			return{
				restrict: "AE",
				template:"<div data-ng-form='comp'><label>Company/Suspect Name<span class='reqText' data-ng-show='compReq'>Required</span></label><input type='text' name='compName' data-ng-model='compName' data-ng-required='compReq' placeholder='Company Name'>" +
				"<p data-ng-show='comp.compName.$invalid && comp.compName.$dirty'>You must enter an address</p>",
				link: function(scope, ele, attr){
					scope.compReq= false;
					if(attr.req){
						scope.compReq= true;
					}
				}
			}
})

.directive('vin',function(){
			return{
				restrict: 'AE',
				template: "<div data-ng-form='vvi'><label>Last Four of VIN<span class='reqText' data-ng-show='vinReq'>Required</span></label><input type='text' name='vvin' data-ng-model='vvin' data-ng-pattern='vinR' data-ng-required='vinReq' placeholder='VIN'>" +
						"<p data-ng-show='vvi.vvin.$invalid && vvi.vvin.$dirty'>Enter last 4 digits of Vehicle Identification Number</p>",
				link: function(scope,ele,attr){
					scope.vinR= /^(\d){4}$/;
					scope.vinReq= false;
						if(attr.req){
							scope.vinReq= true;
						}
				}
			}
		})

.directive('return', function(){
			return{
				restrict: 'A',
				template:'<nav data-ng-show="rt">' +
						'<a data-ng-click="next()"> Return to Summary</a></nav>',
				replace: true
			};
		})

.directive('portalcancel', function(){
			return{
				restrict: 'E',
				template:'<nav class="portalCancel" ng-controller="PortalCancelController">' +
						'<a ng-click="portalCancel()">Cancel</a></nav>',
				replace: true
			};
		})

.directive('detail', function(){
			return{
				restrict:'AE',
				template:'<div data-ng-form="deti"><label>Details<span class="reqText" data-ng-show="detailsReq">Required</span></label>' +
						'<textarea name="details" data-ng-model="details"  data-ng-maxlength="500" data-ng-change="change()" data-ng-required="detailsReq" placeholder="Details"></textarea>' +
						'<p data-ng-show="deti.details.$invalid && deti.details.dirty">You must enter details</p>' +
						'<p ng-show="deti.details.$error.maxlength">You have exceeded the maximum amount of characters</p>' +
						'<p ng-show="deti.details.$valid">{{left}}</p></div>',
				link: function(scope,ele,attr){
					scope.detailsReq= false;
					if(attr.req){
						scope.detailsReq= true;
				}
					scope.change = function() {
						var a = scope.details;
						if(a) {
							scope.left = 500 - a.length + " characters remaining";
						}else{
							scope.left = "500 character limit";
						}
					}
			}
		}
})

.directive('contactsubj', function(){
	return{
		restrict:'AE',
		template:'<div data-ng-form="conFrm"><label>Subject<span class="reqText">Required</span></label>'+
				'<select id="sub" data-ng-change="setText(subject)" data-ng-model="subject" required="true" style="background:#eee;" name="subject">' +
					'<option value="">Choose a Subject</option><option value="di" data="Driver Information">Driver Information</option><option value="vi">Vehicle Information</option>' +
			'<option value="su">Suspension</option><option value="ot">Online Transaction</option><option value="gq">General Question</option>' +
					'<option value="co">Comments</option><option value="ti">Technical Information</option><option value="ot">Other</option></select>' +
			'<p data-ng-show="conFrm.subject.$invalid && conFrm.subject.$dirty">Select a subject</p></div>'
	}
})


.directive('yesno', function(){
	return{
		restrict: 'AE',
		template: '<label>Response Requested? <span class="reqText" data-ng-show="respReq">Required</span>' +
					'<ul class="radioList"><li><label><input type="radio" name="resp" data-ng-model="resp" value="Yes" data-ng-change="addResponse(resp)"><span>Yes</span></label>' +
					'<label class="last"><input type="radio" name="resp" data-ng-model="resp" value="No" data-ng-change="addResponse(resp)"><span>No</span></label>' +
					'<p data-ng-show="form.$invalid">Required</p>',
		link: function(scope,ele,attr){
			scope.respReq= false;
			if(attr.req){
				scope.respReq= true;
			}
		}
	}
})
		.directive('cal', function(){
			return{
				restrict: 'AE',
				template: '<div data-ng-form="calFrm"><label>{{title}} <span class="reqText" data-ng-show="dateReq">Required</span></label><input type="date" class="{{va}}" data-ng-change="d(date)" name="date" data-ng-model="date" data-ng-required="{{dateReq}}"  placeholder="mm/dd/yyyy">' +
				'<p data-ng-show="calFrm.date.$invalid && calFrm.date.$dirty">You must enter a valid date ex.(mm/dd/yyyy)</p></div>',
				link: function(scope,ele,attr){
					scope.dateReq= false;
					//scope.$watch('date', function(newVal, oldVal) {
					//});
					if(Modernizr.inputtypes.date) {
					}else{
						scope.d= function(x){
						var t= /(0?[1-9]|1[012])[- \/.](0?[1-9]|[12][0-9]|3[01])[- \/.](20)\d\d/;
						var b= t.test(x);
							if(b == true && x.length <= 10 || scope.calFrm.date.$modelValue === ""){
								scope.calFrm.date.$invalid= false;
								scope.va= "ng-valid ng-dirty";
							}else{
								scope.calFrm.date.$invalid= true;
								scope.va= "ng-invalid ng-dirty";
							}
						}
					}
					scope.title= attr.title;
					if(attr.req){
						scope.dateReq= true;
					}
				}
			}
		})




.directive('opts',function(){
			return{
				restrict: 'AE',
				scope: {},
				template: "<div data-ng-form='optsFrm'><label>{{title}}<span class='reqText' data-ng-show='vinReq'>Required</span></label><select data-ng-model='opts' data-ng-change='optChange(opts)' name='opts' data-ng-options='c for c in ops'><option value=''>{{current}}</option></select>" +
						"<p data-ng-show='optsFrm.opts.$invalid && optsFrm.opts.$dirty'>Enter last 4 digits of Vehicle Identification Number</p>",
				link: function(scope,ele,attr){
					var t= attr.type;
					var b= attr.options.split(',')
					scope.ops= b;
					scope.current= "select one"
					if(sessionStorage.getItem("opts" + t)){
						scope.opts= sessionStorage.getItem("opts" + t);
						scope.current= sessionStorage.getItem("opts" + t);
					}else{
						sessionStorage.setItem("opts" + t, "N/A");
					}
					scope.optChange = function(x){
						if(x === null || x === ""){
							sessionStorage.setItem("opts" + t, 'N/A');
						}else{
							sessionStorage.setItem("opts" + t, x);
							scope.current= x;
						}
					}
					scope.title= attr.title;
					scope.vinReq= false;
					if(attr.req){
						scope.vinReq= true;
					}
				}
			}
		})



.directive('placeholder', ['$timeout', function($timeout){
			if (navigator.userAgent.indexOf("MSIE") < 0) {
				return{
				}
			}
			if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
				var s = new Number(RegExp.$1);
				if (s > 10) {
					return;
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














