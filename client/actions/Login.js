import {get, phpPost,post} from "./BaseAction";
import {host} from "./hostConf";
export const GET_VERIFICATION_CODE = "GET_VERIFICATION_CODE";
export const LONGIN_SYS = "LONGIN_SYS";

//获取验证码
export function getVerificationCode(data, callback=(json)=>{}){
  return get(`${host.pathLogin}visitor/sendsms`, data,callback, (json)=>{
    return {
      type : GET_VERIFICATION_CODE,
      json
    }
  })
}

//登陆
export function loginSys(data, callback=(json)=>{}){
  return post(`${host.pathLogin}login`, data,callback, (json)=>{
    return {
      type : LONGIN_SYS,
      json
    }
  })
}
