import {REGISTER_USER} from "../_actions/tyeps";
import {LOGIN_USER} from "../_actions/tyeps";
import {CHECK_USER} from "../_actions/tyeps";
import {UPDATE_USER} from "../_actions/tyeps";
import {Find_USER} from "../_actions/tyeps";
import {BOARD} from "../_actions/tyeps";

export default function (state = {}, action){
    switch(action.type){
        case REGISTER_USER:
            return{...state, Success: action.payload};
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
        case CHECK_USER:
            return{...state, Success: action.payload};
        case UPDATE_USER:
            return{...state, Success: action.payload};
        case Find_USER:
            return{...state, Success: action.payload};
        case BOARD:
            return{...state, Success: action.payload};
        default:
            return state;
    }
}