import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import App2 from './app2';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/' component={App2}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
