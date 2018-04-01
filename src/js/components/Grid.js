import React, { Component } from "react";
import Cell from "./Cell.js";
import { createGrid, iterateSurroundingCells } from "../utils/gridUtils.js";
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
      grid: createGrid(props.rows, props.columns, props.mines),
      isGameOver: false
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("THIS IS WORKING");
    this.setState({
      grid: createGrid(props.rows, props.columns, props.mines)
    });
  }

  openSurrounding(x, y) {
    const grid = this.state.grid;
    let cell = grid[x][y];
    let fcn = (newX, newY) => {
      let nextCell = grid[newX][newY];
      if (nextCell.count === 0 || nextCell.hasMine === false) {
        this.openCell(newX, newY);
      }
    };
    iterateSurroundingCells(grid, x, y, fcn);
  }
  openCell(i, j) {
    const grid = this.state.grid.slice();
    if (!grid[i][j].isOpened && !grid[i][j].isFlagged) {
      if (grid[i][j].hasMine) {
        this.props.endGame("L");
      } else {
        grid[i][j].isOpened = true;
        let newOpenedCells = this.state.openedCells + 1;
        if (grid[i][j].count === 0) {
          this.openSurrounding(i, j);
        }
        this.setState({
          grid: grid,
          openedCells: newOpenedCells
        });
        const didWin =
          newOpenedCells ===
          this.props.rows * this.props.columns - this.props.mines;
        if (didWin) {
          this.props.endGame("W");
        }
      }
    }
  }
  toggleFlag(i, j) {
    const grid = this.state.grid.slice();
    if (!grid[i][j].isOpened) {
      grid[i][j].isFlagged = !grid[i][j].isFlagged;
    }
    this.setState({ grid: grid });
  }
  renderCell(i, j) {
    let gridCell = this.state.grid[i][j];
    return (
      <Cell
        count={gridCell.count}
        isOpened={gridCell.isOpened}
        hasMine={gridCell.hasMine}
        isFlagged={gridCell.isFlagged}
        onClick={() => this.openCell(i, j)}
        onContextMenu={e => {
          e.preventDefault();
          this.toggleFlag(i, j);
        }}
      />
    );
  }
  render() {
    var grid = this.state.grid.map((row, i) => {
      let rows = row.map((column, j) => {
        return this.renderCell(i, j);
      });
      return <tr>{rows}</tr>;
    });
    return (
      <table className="grid">
        <tbody>{grid}</tbody>
      </table>
    );
  }
}

export default Grid;
