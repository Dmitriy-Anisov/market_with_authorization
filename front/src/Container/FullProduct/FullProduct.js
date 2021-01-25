import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { deleteProduct, fetchFullProduct, fetchOneCategory } from '../../store/actions/mainActions';
import './FullProduct.css';

const FullProduct=()=>{
    const history=useHistory();
    const dispatch=useDispatch();
    const user=useSelector(state=>state.users.user);
    const fullProduct=useSelector(state=>state.main.fullProduct);
    const category=useSelector(state=>state.main.fullProductCategory);
    const params=useParams();
    const card=`http://localhost:8000/uploads/${fullProduct.image}`;

    useEffect(()=>{
        dispatch(fetchFullProduct(params.id));
        // dispatch(fetchOneCategory(fullProduct.category));
    },[dispatch]);

    const deleteProductHandler=()=>{
        dispatch(deleteProduct(params.id,user.token));
    };
    
    const goToMainPage=()=>{
        history.replace('/');
    };
    
   

    let contactUser=(
        <p></p>
    );
    if(fullProduct.user){
        contactUser=(
            <div>
                <p>Contact: {fullProduct.user.name} </p>
                <p>Tel: {fullProduct.user.phone}</p>
            </div>
        );
    }
    let categoryDiv=(
        <p></p>
    );
    if(category){
        categoryDiv=(
            <p>Category: {category.name}</p>
        )
    }
    let deleteBtn=(
        <div></div>
    );
    if(user && fullProduct.user){
        if(user._id===fullProduct.user._id){
            deleteBtn=(
                <button className='btn' onClick={deleteProductHandler}>DELETE</button>
            );
        };
    }

    return(
        <div className='container'>
            <div className='header'>
                <h4>Full Product</h4>
                <button className='btn' onClick={goToMainPage}>MAIN</button>
            </div>
            <div className='full-box'>
                <div className='full-inside'>
                    <h2>
                       {fullProduct.title}
                    </h2>
                    <img src={card} alt='photo' className='product-image'/>
                </div>
                <div>
                    <p>{fullProduct.description}</p>
                    <p>Price: {fullProduct.price} $</p>
                    {categoryDiv}
                    {contactUser}
                    {deleteBtn}
                </div>
            </div>
        </div>
    )
}
export default FullProduct;