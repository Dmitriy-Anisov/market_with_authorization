import React from 'react';
import {Route, Switch} from "react-router-dom";
import AddProduct from './Container/AddProduct/AddProduct';
import FullProduct from './Container/FullProduct/FullProduct';
import Login from './Container/Login/Login';
import Main from './Container/Main/Main';
import Register from './Container/Register/Register';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/add' exact component={AddProduct}/>
        <Route path='/product/:id' exact  component={FullProduct}/>

      </Switch>
    </>
  );
}

export default App;
