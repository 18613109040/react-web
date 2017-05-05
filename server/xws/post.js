
var request = require('request');
var lib  =require('./service')
const formidable = require('formidable')
formidable.encoding = 'utf-8';

module.exports = function(app){
  app.post(['/SibuXwsApi/*'],function *(next){
    
    var url = this.request.url
    url = url.replace(/\/SibuXwsApi\//g,'/')
    var options = lib.getOptions(url,'POST',this.request);
    function callback(error, response, body) {
      var cookie = response.headers['set-cookie']
      if (!error && response.statusCode == 200) {
        if(cookie)
        	res.setHeader('set-cookie',cookie[0])
        return body
      }
    }
    return this.body =  request(options, callback);    
  })
  app.post(['/SibuXwsApiJson/*'],function *(next){
    var url = this.request.url
    url = url.replace(/\/SibuXwsApiJson\//g,'/')
    var body = ''
    this.request.on('data',function(chunk){
      body+=chunk
    })
    this.request.on('end',function(){
      var options = lib.getJsonOptions(url,this.request,body);
      function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
         return body
        }
      }
    	return this.body =  request(options, callback); 
    })   
  })
}

