import React, { Component } from 'react';
import Grid from './components/Grid.js';
import '../style/App.css';

/**
 * This is the default gif component that comes with base react
 */
class App extends Component {
  render() {
    return (
      <Grid
        rows={10}
        columns={10}
        mines={9}
      />
    );
  }
}

export default App;
