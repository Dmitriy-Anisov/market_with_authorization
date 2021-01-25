import axios from '../../axios';
import {push} from "connected-react-router";
import { LOGIN_USER_FAIL, LOGIN_USER_SUCCESS, LOGOUT_USER, REGISTRER_USER_FAIL, REGISTRER_USER_SUCCESS } from '../actionTypes';


export const registerUserFailure=err=>({type:REGISTRER_USER_FAIL, err});
export const registerUserSuccess=(value)=>({type:REGISTRER_USER_SUCCESS,value});

export const registerUser=(object)=>{
    return async dispatch=>{
        try{
            const res= await axios.post('/users', object);
            dispatch(registerUserSuccess(res.data));
            dispatch(push('/'));
        }
        catch(e){
            if(e.response && e.response.data){
                dispatch(registerUserFailure(e.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No internet'}));
            }
        }
    }
}

export const loginUserFailure=err=>({type:LOGIN_USER_FAIL,err});
export const loginUserSuccess=value=>({type:LOGIN_USER_SUCCESS,value});

export const loginUser=(object)=>{
    return async dispatch=>{
        try{
            const res= await axios.post('/users/sessions', object);
            dispatch(loginUserSuccess(res.data));
            dispatch(push('/'));
        }
        catch(e){
            if(e.response && e.response.data){
                dispatch(loginUserFailure(e.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet'}));
            }
        }
    }
}


export const logoutUser=()=>{
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        await axios.delete('/users/sessions', {headers:{Authorization:token}});
        dispatch({type: LOGOUT_USER});
        dispatch(push('/'));
      }
    
};