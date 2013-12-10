
/*
 * GET home page.
 */

exports.index = function(req, res){
	//if(req.session.loggedIn === true){
		//res.header('x-auth-token' , "yes" );
	//}else{
		//res.header("x-auth-token", "no")
	//}
	res.render('index', { title: 'Express' });
};