import axios from '../../axios';
import { FETCH_CATEGORIES_SUCCESS, FETCH_ONE_CATEGORY, FETCH_ONE_PRODUCT_SUCCESS, FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS } from '../actionTypes';
import {push} from "connected-react-router";


export const fetchCategoriesSuccess=value=>({type:FETCH_CATEGORIES_SUCCESS,value});

export const fetchProductsSuccess=value=>({type:FETCH_PRODUCTS_SUCCESS,value});
export const fetchProductsError=error=>({type:FETCH_PRODUCTS_ERROR,error});

export const fetchProducts=()=>{
    return async dispatch=>{
        try{
            const resp=await axios.get('/products');
            dispatch(fetchProductsSuccess(resp.data));
        }
        catch(e){
            dispatch(fetchProductsError(e));
        }
    }
}

export const fetchCategories=()=>{
    return async dispatch=>{
        try{
            const resp=await axios.get('/categories');
            dispatch(fetchCategoriesSuccess(resp.data));
        }
        catch(e){
            dispatch(fetchProductsError(e));
        }
    }
}

export const fetchProductsNewCategory=(id)=>{
    return async dispatch=>{
        try{
            const resp=await axios.get('/products?category='+id);
            dispatch(fetchProductsSuccess(resp.data));
        }
        catch(e){
            dispatch(fetchProductsError(e));
        }
    }
};

export const addProduct=(object,token)=>{
    return async dispatch=>{
          try{
            await axios.post('/products', object,{headers:{Authorization:token}}); 
            dispatch(push('/'));
          }
          catch(e){
            dispatch(fetchProductsError(e));
          }
    }
};

export const fetchFullProductSuccess=value=>({type:FETCH_ONE_PRODUCT_SUCCESS,value});
export const fetchOneCategorySuccess=value=>({type:FETCH_ONE_CATEGORY,value});

export const fetchFullProduct=(id)=>{
    return async dispatch=>{
        try{
            const resp=await axios.get('/products/'+id);
            dispatch(fetchFullProductSuccess(resp.data));
            const newRes=await axios.get('/categories/'+resp.data.category);
            dispatch(fetchOneCategorySuccess(newRes.data));
        }
        catch(e){
            dispatch(fetchProductsError(e));
        }
    }
};

export const deleteProduct=(id,token)=>{
    return async dispatch=>{
          try{
            await axios.delete('/products/'+id,{headers:{Authorization:token}}); 
            dispatch(push('/'));
            alert('Deleted');
          }
          catch(e){
            dispatch(fetchProductsError(e));
          }
    }
};

