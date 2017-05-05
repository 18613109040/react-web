import {polyfill} from "es6-promise";
import fetch from "isomorphic-fetch";
import {host} from "./hostConf";
/**
 * @desc 格式化一个对象为字符串如 name=pat&city_no=020&old=99;
 * @param data string
 **/
function parseParams(data){
  if(data == null){return '';}
  let list = [];
  for(let item in data){
    list.push(`${item}=${data[item]}`)
  }
  return list.join("&");
}
const option = {
  timeout: 10000,
  credentials: 'include',
  mode: "cors"
};

export function get(url="", data=null, callback=(json)=>{}, reducersConnect=(json)=>{}){
  const params = parseParams(data), tarUrl = data==null?url:`${url}?${params}`;
  console.dir(tarUrl)
  return dispatch=>{
    return fetch(tarUrl, {method: "GET",...option})
      .then( response => {
      	console.dir(response)
        return response.json()
      })
      .then(json=>{
        dispatch(reducersConnect(json));
        callback(json);
      })
  }
}

export function post(url="", data=null, callback=(json)=>{}, reducersConnect=(json)=>{}){
  return dispatch=>{
    return fetch(url, {method: "POST",body:JSON.stringify(data),option})
      .then( response => {
        return response.json()
      })
      .then(json=>{
        dispatch(reducersConnect(json));
        callback(json);
      })
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
