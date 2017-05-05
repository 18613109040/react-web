import {TEST} from '../actions/Test'

export  function testreducer(state = {name:0}, action) {
    let json = action.json;
    switch (action.type) {
        case TEST:
            console.dir(json)
            return Object.assign({},state,json);
        default:
            return state
    }
}

 
