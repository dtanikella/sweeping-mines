import React, { Component } from 'react';
import Game from './components/Game.js';
import '../style/App.css';

/**
 * This is the default gif component that comes with base react 
 */
class App extends Component {
  render() {
    return (
      <Game />
    );
  }
}

export default App;
