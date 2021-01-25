import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router';
import { loginUser } from '../../store/actions/userActions';


const Login=()=>{
    const dispatch=useDispatch();
    const errors=useSelector(state=>state.users.loginErrors);
    const history=useHistory();

    const [state,setState]=useState({
        username:'',
        password:''
    });

    const inputHandler = event => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    const formSubmitHandler = async event => {
        event.preventDefault();
        await dispatch(loginUser({...state}));
    };

    const signInHandler=()=>{
        history.replace('/register');
    };

    const goToMainPage=()=>{
        history.replace('/');
    };

    
    let errorUsernameDiv=(
        <p ></p>
    );
    if(errors&&errors.error){
        errorUsernameDiv=(
            <p  className='errors'>{errors.error}</p>
        )
    };

    return(
        <div className='container'>
             <div className='header'>
                <h4>Authorization</h4>
                <button className='btn' onClick={goToMainPage}>MAIN</button>
            </div>
            <form onSubmit={formSubmitHandler}>
                {errorUsernameDiv}
                <input type='text' name='username' placeholder='Username*' onChange={inputHandler} className='form-input' required/>
                <input type='password' name='password' placeholder='Password*' onChange={inputHandler} className='form-input' required/>
                <button type='submit' className='btn btn-register'>Sign In</button>
                <button type='button' className='btn btn-register' onClick={signInHandler}>Sign Up</button>
            </form>
        </div>
    );
}
export default Login;