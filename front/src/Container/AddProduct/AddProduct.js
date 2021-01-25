import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addProduct, fetchCategories } from '../../store/actions/mainActions';
import './AddProduct.css';

const AddProduct=()=>{
    const history=useHistory();
    const categories=useSelector(state=>state.main.categories);
    const user=useSelector(state=>state.users.user);
    const errors=useSelector(state=>state.main.errors);
    const [state,setState]=useState({});
    const dispatch=useDispatch();
    
    useEffect(()=>{
        if(!user){
            history.replace('/login');
        }
        dispatch(fetchCategories());
    },[user]);

    const fileChangeHandler = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setState(prevState =>({
            ...prevState,
            [name]: file
            })
        )
    };

    const inputHandler = event => {
        const {name, value} = event.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    const formSubmitHandler = async event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(state).forEach(key => {
            formData.append(key, state[key])
        });
        await dispatch(addProduct(formData,user.token));
    };
    const goToMainPage=()=>{
        history.replace('/');
    };

    const selectDiv=(
        <select className="input-add"  name='category' onChange={inputHandler}>
            <option></option>
            {
                categories.map(item=>{
                    return(
                        <option value={item._id}  key={item._id}>{item.name}</option>
                    );
                })
            }
        </select>
    );
    let errorsDiv=(
        <p></p>
    );
    if(errors){
        errorsDiv=(
            <p>{errors.message}</p>
        );
    };

    return(
        <div className='container'>
            <div className='header'>
                <h4>Add New Product</h4>
                <button className='btn' onClick={goToMainPage}>MAIN</button>
            </div>
            <form onSubmit={formSubmitHandler}>
                {selectDiv}
                <input type='text' name='title' placeholder='Title*' onChange={inputHandler} className='input-add input-add-form' required/>
                <input type='text' name='description' placeholder='Description*' onChange={inputHandler} className='input-add input-add-form' required/>
                <input type='text' name='price' placeholder='Price*' onChange={inputHandler} className='input-add input-add-form' required/>
                <input type='file' name='image'onChange={fileChangeHandler} required/>
                <button type='submit' className='btn'>Add Product</button>
            </form>
            {errorsDiv}
        </div>
    )
}
export default AddProduct;