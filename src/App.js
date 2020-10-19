import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import TrendingGifs from './screens/TrendingGifs/TrendingGifs';
import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
          <Route exact path="/" component={TrendingGifs} />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
