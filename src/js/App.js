import React, { Component } from "react";
import Grid from "./components/Grid.js";
import "../style/App.css";

/**
 * This is the default gif component that comes with base react
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 10,
      columns: 10,
      mines: 9,
      endGame: this.endGame
    };
  }
  endGame(gameCondition) {
    if (gameCondition === "W") {
      console.log("WINNER");
      //option to restart
    } else if (gameCondition === "L") {
      console.log("LOSER");
      //end the game (TODO: option to restart the game)
    }
  }
  restartGame() {
    this.setState({
      rows: 10,
      columns: 10,
      mines: 9,
      endGame: this.endGame
    });
  }
  render() {
    return (
      <div>
        <div className="restart" onClick={this.restartGame}>
          RESTART
        </div>
        <Grid
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          endGame={this.endGame}
        />
      </div>
    );
  }
}

export default App;
