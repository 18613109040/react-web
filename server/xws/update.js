
var http = require('http')
var fs = require('fs');
var path = require('path');
var request = require('request');
var lib  =require('./service')
const formidable = require('formidable')
formidable.encoding = 'utf-8';


//中传文件上传的node服务器文件夹
var target_path = path.join(__dirname, '../public')
fs.exists(target_path,function(err){
  if(!err){
    fs.mkdir(target_path,function(){
      console.log(target_path,'：文件路径创建成功')
    })
  }else{
    console.log(target_path,'：文件路径已经存在')
  }
})

module.exports  = function(app){

  // 上传图片
  app.post('/SibuXwsApiFile/*',function*(next){
    var url = this.request.url
    url = url.replace(/\/SibuXwsApiFile\//g,'/')
    var form = new formidable.IncomingForm()
    form.parse(this.request, function(err, fields, files) {
      // define err page
      
      if (err) return this.response.end('upload file error')

      var tmp_path = files.file.path
      var type = files.file.name.split('.')[1]
      var name = [Date.now(),type]
      name = name.join('.')
      var target_file = path.join(target_path, name)

      var source = fs.createReadStream(tmp_path)
      var dest = fs.createWriteStream(target_file)

      source.pipe(dest).on('close',function(){
        console.log(lib.url+url)
        var cookie = this.request.headers['cookie']
        var options = {
          method: 'POST',
          url: lib.url+url,
          headers: {
            'User-Agent': 'request',
            'Cookie' : cookie,
            'Content-Type': 'application/json',
          },
        }
        var r = request(options, function optionalCallback(error, response, body) {
          body = JSON.parse(body)
          console.log(body)
          if (error) {
            console.log(error)
          }
            this.response.json(body)
          fs.unlink(target_file,function(err){
            if(!err)console.log(target_file,'删除成功')
          })
        })
        var pushForm = r.form()
        pushForm.append('file',fs.createReadStream(target_file),{filename: name})
        for(var key in fields){
          if(key){
            pushForm.append(key,fields[key])
          }
        }
      })
    })
    
  })

}