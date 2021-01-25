import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import mainReducer from './store/reducers/mainReducer';
import { applyMiddleware, compose, createStore ,combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import userReducer from './store/reducers/userReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

const rootReducer = combineReducers({
  main: mainReducer,
  users:userReducer,
  router: connectRouter(history)
});

const middleware = [ 
  thunk, 
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));
const saveToLocalStorage=state=>{
  try{
    const serializedState=JSON.stringify(state);
    localStorage.setItem('state',serializedState);
  }
  catch(e){
    console.log('Save state to localStorage error');
  }
};

const loadFromLocalStorage=()=>{
  try{
    const serializedState=localStorage.getItem('state');
    if(serializedState===null){
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch(e){
    return undefined;
  }
};

const persistedState=loadFromLocalStorage();


const store = createStore(rootReducer,persistedState,enhancers);


store.subscribe(()=>{
  saveToLocalStorage({
    users:{
      user:store.getState().users.user
    }
  });
});

const app=(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
