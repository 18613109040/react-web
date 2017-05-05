import {get, phpPost,post} from "./BaseAction";
import {host} from "./hostConf";
export const GET_SHOP_SET = "GET_SHOP_SET";
export const SAVE_SHOP_SET = "SAVE_SHOP_SET";

//获取店铺设置
export function getShopSet(data, callback=(json)=>{}){
  return get(`${host.path}shop/getShop`, data,callback, (json)=>{
    return {
      type : GET_SHOP_SET,
      json
    }
  })
}

//保存店铺设置
export function saveShopSet(data, callback=(json)=>{}){
  return post(`${host.path}shop/switchReductionMode`, data,callback, (json)=>{
    return {
      type : SAVE_SHOP_SET,
      json
    }
  })
}
