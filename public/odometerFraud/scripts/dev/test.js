if (window.location.href.indexOf('localhost') !==-1) {
	alert(local)
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = 'http://localhost/globals/globals.js'
	document.body.appendChild(script);
}
else {
	alert(no)
	script.src = 'http://10.156.147.121/globals/globals.js'
}