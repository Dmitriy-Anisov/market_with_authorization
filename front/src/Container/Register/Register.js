import React, { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { registerUser } from '../../store/actions/userActions';
import { useHistory } from 'react-router';
import './Register.css';

const Register=()=>{
    const dispatch=useDispatch();
    const errors=useSelector(state=>state.users.registerErrors);
    const history=useHistory();

    const [state,setState]=useState({
        username:'',
        password:'',
        name:'',
        phone:''
    });

    const inputHandler = event => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    const formSubmitHandler = async event => {
        event.preventDefault();
        await dispatch(registerUser({...state}));
    };

    const signInHandler=()=>{
        history.replace('/login');
    };

    const goToMainPage=()=>{
        history.replace('/');
    };

    
    let errorDiv=(
        <p></p>
    );

    if(errors&&errors.errors.username.message){
        errorDiv=(
            <p className='errors'>{errors.errors.username.message}</p>
        )
    }

    return(
        <div className='container'>
             <div className='header'>
                <h4>Registration</h4>
                <button className='btn' onClick={goToMainPage}>MAIN</button>
            </div>
            {errorDiv}
            <form onSubmit={formSubmitHandler}>
                <input type='text' name='username' placeholder='Username*' onChange={inputHandler} className='form-input' required/>
                <input type='password' name='password' placeholder='Password*' onChange={inputHandler} className='form-input' required/>
                <input type='text' name='name' placeholder='Name*' onChange={inputHandler} className='form-input' required/>
                <input type='text' name='phone' placeholder='Phone*' onChange={inputHandler} className='form-input' required/>
                <button type='submit' className='btn btn-register'>Sign Up</button>
                <button type='button' className='btn btn-register' onClick={signInHandler}>Sign In</button>
            </form>
        </div>
    );
}
export default Register;