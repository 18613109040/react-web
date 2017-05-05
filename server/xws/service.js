
const serverUrl = "http://testseller.mall.doubozhibo.com" //正式
// const serverUrl = "http://192.168.130.92:8085" //邱景旺本地api地址
const token = 'sI6EEuhEfZlufsE8IrGc2lgXuOsff73CkCSLofX2uz*3Z2U7zyyn3VnztSb: LYBzybev4*7VBP4SqjbpSl1hhw__'

function getOptions(_path,method,req){
  console.log(serverUrl+_path)
  var cookie = req.headers['cookie']
  var options = {
    method: method||'GET',
    url: serverUrl+_path,
    headers: {
      'User-Agent': 'request',
      'Cookie' : cookie,
      'Content-Type': 'application/json',
    },
  }
  if(method === 'POST'){
    options.formData = req.body
    options.json = true
  }
  return options
}

function getJsonOptions(_path,req,body){
  console.log(serverUrl+_path)
  var cookie = req.headers['cookie']
  var options = {
    method: 'POST',
    url: serverUrl+_path,
    headers: {
      'Cookie' : cookie,
      'Content-Type': 'application/json'
    },
    json:JSON.parse(body)
  }
  return options
}


const lib = {
  url : serverUrl,
  getOptions : getOptions,
  getJsonOptions :getJsonOptions
}

module.exports=lib

// 