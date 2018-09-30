import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Adrian's React page</h1>
        </header>
        <p className="App-intro">
          I'm looking forward <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
