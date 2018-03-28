import React, { Component } from 'react';
import Cell from './Cell.js';
//import '../style/Grid.css';

/**
 * [Grid description]
 * @extends Component
 *
 */
class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid : this.createGrid(props),
      isGameOver: false
    };
  }
  createGrid(props){
    let grid = [];
    for(let i=0; i < props.rows; i++){
      grid.push([]);
      for(let j=0; j < props.columns; j++){
        grid[i].push({
          x:j,
          y:i,
          count:0,
          isOpened: false,
          hasMine: false,
          isFlagged: false
        })
      }
    }
    for(let x=0; x < props.mines; x++){
      let cell = grid[Math.floor(Math.random()*props.rows)][Math.floor(Math.random()*props.columns)];
      if(cell.hasMine){
        x--;
      }else{
        cell.hasMine = true;
      }
    }
    return grid;
  }
  openCell(i,j){
    //find cell that was clicked, and reveal it
    //if no mines, show surroundingMines (recursively)
    //if mines, end the game
    const grid = this.state.grid.slice();
    if(!grid[i][j].isOpened){
      if(grid[i][j].hasMine){
        alert('you lose');
        //end the game (TODO: option to restart the game)
        //Make sure to have a message indicating ending of the game
      }else{
        //this.showCounts (recursively opens cells)
      }
    }
  }
  toggleFlag(i,j){
    //toggle the display of a flag on a cell (check if opened first)
  }
  renderCell(i,j){
    let gridCell = this.state.grid[i][j];
    return (
      <Cell
        count={gridCell.count}
        isOpened={gridCell.isOpened}
        hasMine={gridCell.hasMine}
        isFlagged={gridCell.isFlagged}
        onClick={() => this.openCell(i,j)}
        onContextMenu={() => this.toggleFlag(i,j)}
      />
    )
  }
  render() {
    let that = this;
    var grid = this.state.grid.map((row, i) => {
      let rows = row.map((column, j) => {
        return (that.renderCell(i,j));
      });
      return(
        <tr>
          {rows}
        </tr>
      )
    });
    return (
      <table className="grid">
        <tbody>
          {grid}
        </tbody>
      </table>
    );
  }

}

export default Grid;
