import React from 'react';
import './App.css';
import Header from './Components/Header';
import Login from './Components/login/Login'
import Registration from './Components/login/Registration'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="body">
      <BrowserRouter>
        <Switch>
          <Route path='/home' component={Header} />
          <Route path='/login' component={Login} />
          <Route path='/registration' component={Registration} />
        </Switch>
      </BrowserRouter>      
    </div>
  );
}

export default App;
