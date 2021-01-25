import { LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTRER_USER_FAIL, REGISTRER_USER_SUCCESS } from "../actionTypes";

const initialState={
    registerErrors:null,
    loginErrors:null,
    user:null
};


const userReducer=(state=initialState, action)=>{
    switch (action.type){
        case REGISTRER_USER_FAIL:
            return{...state,registerErrors:action.err};
        case REGISTRER_USER_SUCCESS:
            return{...state,registerErrors:null,user:action.value};
        case LOGIN_USER_SUCCESS:
            return{...state,user:action.value, loginErrors:null};
        case LOGIN_USER_FAIL:
            return{...state,loginErrors:action.err, user:null };
        case LOGOUT_USER:
            return {...state,user:null};
        default:
            return state;
    }
}
export default userReducer;