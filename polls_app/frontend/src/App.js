import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import App2 from './components/app2';
import Home from './components/Home';
import Poll from './components/Poll';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route exact path='/test' component={App2}/>
            <Route exact path='/' component={Home}/>
            <Route exact path='/poll/:id' component={Poll}/>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
