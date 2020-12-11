import React from 'react';
import {Route, HashRouter,Switch } from 'react-router-dom';
import Login from '../src/page/login';

function App (){
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path='/' exact component={Login}></Route>
          </Switch>
          </HashRouter>
      </div>
    );
  }

export default App;
