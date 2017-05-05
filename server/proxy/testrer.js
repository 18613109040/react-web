var request = require('request');
var lib  =require('./service')
module.exports = function(app){
	app.get('/SibuXwsApi/*', function *(next) {
  	console.log("get")
  	let {url} = this.request;
  	url = url.replace(/\/SibuXwsApi\//g,'/');
  	var options = lib.getOptions(url,'GET',this.request);
  	return this.body = request(options, function(error, response, body){
	    	if (!error && response.statusCode == 200) {
	        var info = JSON.parse(body);
	        console.log(info)
	        return info 
	      }else{
	      	 return {
	      	 	errorCode:0,
						errorMsg:"请求失败,服务",
						result:false,
            success:false
	      	 }
	      }
	    });
	});
}

