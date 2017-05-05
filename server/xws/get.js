
var request = require('request');
var lib  =require('./service')

module.exports = function(app){
  app.get(['/SibuXwsApi/*'], function *(next){
    var url = this.request.url
    url = url.replace(/\/SibuXwsApi\//g,'/')

    var options = lib.getOptions(url,'GET',this.request);
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
       return info;
      }
    }
    return this.body =  request(options, callback);
  })

  

}

