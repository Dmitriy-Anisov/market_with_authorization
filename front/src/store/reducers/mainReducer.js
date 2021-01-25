import { FETCH_CATEGORIES_SUCCESS, FETCH_ONE_CATEGORY, FETCH_ONE_PRODUCT_SUCCESS, FETCH_PRODUCTS_ERROR, FETCH_PRODUCTS_SUCCESS } from "../actionTypes";

const initialState={
    products:[],
    errors:null,
    categories:[],
    fullProduct:{},
    fullProductCategory:null
}

const mainReducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_PRODUCTS_SUCCESS:
            return{...state,products:action.value,errors:null};
        case FETCH_PRODUCTS_ERROR:
            return{...state,errors:action.error};
        case FETCH_CATEGORIES_SUCCESS:
            return{...state,categories:action.value,errors:null };
        case FETCH_ONE_PRODUCT_SUCCESS:
            return{...state,fullProduct:action.value,errors:null};
        case FETCH_ONE_CATEGORY:
            return{...state,fullProductCategory:action.value,errors:null};
        default:
            return state;
    }
}
export default mainReducer;