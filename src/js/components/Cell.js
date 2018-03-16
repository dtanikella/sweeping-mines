import React, { Component } from 'react';

/**
 * This is the Cell component
 *
 * It will handle scenarios involving opening, flagging, and showing 
 * mines in cells
 *
 * @property {Boolean} state.hasMine -Determines if a cell has a mine
 * @property {Boolean} state.hasFlag -Determines if a cell has a flag
 * @property {Boolean} state.isOpen -Determines if a cell is open
 * @property {number} state.count -Represents the number of mines around the cell
 * 
 */
class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMine : props.cell.hasMine,
            hasFlag : props.cell.hasFlag,
            isOpen : props.cell.isOpen,
            count : 0
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isOpen : nextProps.cell.isOpen,
            hasMine : nextProps.cell.hasMine,
            hasFlag : nextProps.cell.hasFlag,
            count : nextProps.cell.count
        });
    }
    open() {
        if(this.props.allowInput){
            this.props.open(this.props.cell);
        }             
    }
    toggleFlag(e) {
        if(this.props.allowInput){
            e.preventDefault();
            if(!this.state.isOpen){
                this.props.toggleFlag(this.props.cell)
            }
        } 
        
    }
    render() {
        var cell;
        if (this.state.isOpen){
            if (this.state.hasMine){
                cell = (
                    <div className = "open mine">
                        <span className="cell-mine">.</span>
                    </div>
                )
            }else{
                cell = (
                    <div className = "open">
                        <span className="cell-open">{this.state.count}</span>
                    </div>
                )
            }
        }else if(this.state.hasFlag){
            cell = (
                <div className = "covered flag">
                    <span className="cell-covered">.</span>
                </div>
            )
        }else{
            cell = (
                <div className = "covered">
                </div>
            )
        }
        return ( 
            <td className="cell" onClick={this.open.bind(this)} onContextMenu={this.toggleFlag.bind(this)}>
                {cell}
            </td>
        );
    }
}

export default Cell;