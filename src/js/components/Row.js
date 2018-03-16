import React, { Component } from 'react';
import Cell from './Cell.js';

/**
 * This is the Row component
 *
 *  It involves rendering all the cells in a row.
 *  A middle step in rendering the grid. No other functionality
 * 
 */
class Row extends Component {
    constructor(props){
        super(props);
        this.state = {
            cells: props.cells
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            cells : nextProps.cells
        });
    }
    render() {
        var Cells = this.state.cells.map((cell, idx) => {
            return(
                <Cell key={idx} cell={cell} open={this.props.open} toggleFlag={this.props.toggleFlag} allowInput={this.props.allowInput}/>
            );
        });
        return (
            <tr>
                {Cells}
            </tr>
        );
    }
}

export default Row;