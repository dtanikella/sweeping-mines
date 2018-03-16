import React, { Component } from 'react';
import Grid from './Grid.js';

/**
 * This is the Game!
 *
 *  This component includes game start/stop logic. Setting mines, ending the game, etc.
 *
 * @property {number} mines -number of mines to be generated
 * @property {number} rows -number of rows in the minefield
 * @property {number} columns -number of columns in the minefield
 * @property {number} flags -number of flags that have been planted
 * @property {boolean} allowInput -ability to stop the game if it's been won or lost 
 * 
 */
class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            mines: 10,
            rows: 10,
            columns: 10,
            flags:0,
            allowInput: true
        };
    }
    endGame() {
        this.setState({allowInput:false});
    }
    checkFlags(newFlags){
        this.setState({flags: this.state.flags + newFlags});
    }
    reset() {
        this.setState({
            mines: 10,
            rows: 10,
            columns: 10,
            flags:0,
            openedCells:0,
            allowInput: true
        })
    }
    render() {
        return (
            <div className="Game">
                <span className="reset" onClick={this.reset.bind(this)}>RESET</span>
                <Grid 
                mines={this.state.mines} 
                rows={this.state.rows} 
                columns={this.state.columns}
                allowInput={this.state.allowInput}
                checkFlags={this.checkFlags.bind(this)}
                endGame={this.endGame.bind(this)} />
            </div>
        )
    }
}

export default Game;