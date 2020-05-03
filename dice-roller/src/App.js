import React, { Component } from 'react';
import './App.css';
import Die from './Die';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Die face="Two" />
      </div>
    );
  }
}

export default App;
