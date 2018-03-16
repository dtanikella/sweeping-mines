import React, { Component } from 'react';
import Row from './Row.js';

/**
 * This is the Grid component
 *
 * It will involve rendering all the cells, 
 * and tracking their status, opening, and marking them
 *
 *@property {object} grid -The grid that tracks the game
 *@function createGrid -Creates the grid including the randomly placed bombs
 *@function open -opens a cell. Determines if it has a mine. If its empty
 *  it will open the surrounding mines(this is recursive until all 
 *  surrounding cells have a number)
 *
 * @function toggleFlag - toggles the flagged state of a cell
 * @function getMines - gets the number of mines surrounding a cell
 * @function openSurrounding - opens the surrounding cells (called by open)
 * calls open as it loops through each cell. you will notice these feed into each
 * other until mines are found
 * 
 */
class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid : this.createGrid(props)
        };
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.openNum > nextProps.openNum || this.props.columns !== nextProps.columns){
            this.setState({
                grid : this.createGrid(nextProps)
            });
        }

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
                    isOpen: false,
                    hasMine: false,
                    hasFlag: false
                });
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
    open(cell){
        let _grid = this.state.grid;
        _grid[cell.y][cell.x].isOpen = true;
        let mines = this.getMines(cell);
        if(!cell.hasMine){
            _grid[cell.y][cell.x].count = mines;
            if(mines === 0){
                this.openSurrounding(cell);
            }
        }else{
            this.props.endGame();
        }
        this.setState({grid:_grid});
    }
    toggleFlag(cell){
        let _grid = this.state.grid;
        let _cell = _grid[cell.y][cell.x];
        _cell.hasFlag = !_cell.hasFlag;
        this.setState({grid:_grid});
    }
    getMines(cell){
        let mines = 0;
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(cell.y + i >= 0 && 
                    cell.x + j >= 0 && 
                    cell.y + i < this.state.grid.length && 
                    cell.x + j < this.state.grid[0].length && 
                    this.state.grid[cell.y + i][cell.x + j].hasMine && 
                    !(i === 0 && j === 0)){
                        mines ++;
                }
            }
        }
        return mines;
    }
    openSurrounding(cell){
        let _grid = this.state.grid;
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                if(cell.y + i >= 0 && 
                    cell.x + j >= 0 && 
                    cell.y + i < this.state.grid.length && 
                    cell.x + j < this.state.grid[0].length && 
                    !this.state.grid[cell.y + i][cell.x + j].hasMine && 
                    !this.state.grid[cell.y + i][cell.x + j].isOpen){
                        this.open(_grid[cell.y + i][cell.x + j]);
                }
            }
        }
    }
    render() {
        var Rows = this.state.grid.map((row, idx) => {
            return(
                <Row key={idx} cells={row} open={this.open.bind(this)} toggleFlag={this.toggleFlag.bind(this)} allowInput={this.props.allowInput} />
            )
        });
        return(
            <table className="Grid">
                <tbody>
                    {Rows}
                </tbody>
            </table>
        );
    }
}

export default Grid;