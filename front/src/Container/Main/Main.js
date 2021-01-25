import React, { useEffect } from 'react';
import './Main.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchCategories, fetchProducts, fetchProductsNewCategory } from '../../store/actions/mainActions';
import Product from '../../Component/Product/Product';
import { logoutUser } from '../../store/actions/userActions';


const Main=()=>{
    const dispatch=useDispatch();
    const products=useSelector(state=>state.main.products);
    const categories=useSelector(state=>state.main.categories);
    const user=useSelector(state=>state.users.user);
    const history=useHistory();

    useEffect(()=>{
        dispatch(fetchProducts());
        dispatch(fetchCategories());
    },[dispatch]);

    const fullProductHandler=(id)=>{
        history.push('/product/'+id);
    };

    const productsDiv=(
        <div className='products-list'>
            {
                products.map(item=>{
                    return(
                        <Product 
                            key={item._id}
                            price={item.price}
                            image={item.image}
                            title={item.title}
                            click={()=>fullProductHandler(item._id)}
                        />
                    )
                })
            }
        </div>
    );

    const changeCategoryHandler=(id)=>{
        dispatch(fetchProductsNewCategory(id));
    };

    const allProductsHandler=()=>{
        dispatch(fetchProducts());
    };
   

    const categoriesDiv=(
        <div className='submenu'>
            <button className='btn-sub' onClick={allProductsHandler}>All Categories</button>
            {
                categories.map(item=>{
                    return(
                        <div key={item._id}> 
                            <button className='btn-sub' onClick={()=>changeCategoryHandler(item._id)}>{item.name}</button>
                        </div>
                    )
                })
            }
        </div>
    );

    const registerHandler=()=>{
        history.push('/register');
    };
    const loginHandler=()=>{
        history.push('/login');
    };
    const logoutHandler=()=>{
        dispatch(logoutUser());
    };
    const newProductHandler=()=>{
        history.push('/add');
    };

    let menu=(
       
            <div className='menu'>
                <button className='btn' onClick={registerHandler}>Register</button>
                <button className='btn' onClick={loginHandler}>Login</button>
            </div>
    )
    if(user){
        menu=(

            <div className='menu'>
                <button className='btn' onClick={newProductHandler}>Add New Product</button>
                <p>Hi, {user.name}</p>
                <button className='btn' onClick={logoutHandler}>Logout</button>
            </div>
        )
    }

    return(
        <div className='container'>
            <div className='header'>
                <h2>
                    MAIN
                </h2>
                {menu}
            </div>
            {productsDiv}
            {categoriesDiv}
        </div>
    )
}
export default Main;