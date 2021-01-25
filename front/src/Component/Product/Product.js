import React from 'react';
import './Product.css';

const Product=props=>{
 
    const card=`http://localhost:8000/uploads/${props.image}`;
         
    return(
        <div className='product-box' onClick={props.click}>
            <img src={card} alt='photo' className='product-image'/>
            <h4>{props.title}</h4>
            <p>{props.price} $</p>
        </div>
    )
}
export default Product;