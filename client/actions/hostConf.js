export const staticHost = "";
let __host ={
	
}
switch (process.env.NODE_ENV) {
  case "development":  //测试环境
    __host = Object.assign({}, __host, {
      pathLogin: `${staticHost}/dev-sb.cn/`,
     	path:`${staticHost}/dev-sb.cn/`,
     	json:`${staticHost}/dev-sb.cn/`,
     	file:`${staticHost}/dev-sb.cn/`
    });
    break;
  case "production":
  default:   
    __host = Object.assign({}, __host, {
      pathLogin: `${staticHost}/dev-sb.cn/`,
     	path:`${staticHost}/dev-sb.cn/api/`,
     	json:`${staticHost}/dev-sb.cn/api/`,
     	file:`${staticHost}/dev-sb.cn/api/`
    })

}

export const host = __host;
