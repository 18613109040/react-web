import {GET_SHOP_SET,SAVE_SHOP_SET} from '../actions/ShopSet'
const initialState ={
	errorCode:-1,
  errorMsg: "失败",
  success: false,
  result:{
  	shopType:-1
  }
};
export function shopset(state = initialState, action) {
	  const json = action.json;
    switch (action.type) {
        case GET_SHOP_SET:
            return Object.assign(state,json);
            break;
        case SAVE_SHOP_SET:
            return state
        default:
            return state
    }
}

