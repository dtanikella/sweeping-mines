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
