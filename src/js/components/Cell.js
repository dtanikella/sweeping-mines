import React, { Component } from "react";
import '../../style/Cell.css';

/**
 * Each Cell component is very basic, and doesn't have its own state.
 * Instead, it will just communicate clicks up to the grid, where
 * all the logic is taken care of.
 *
 * @extends Component
 */
class Cell extends Component {
  renderCell(){
    let cell;
    if(this.props.isOpened){
      if(this.props.hasMine){
        cell = (
          <div className="open mine">M</div>
        )
      }else{
        cell = (
          <div className="open count">{this.props.count}</div>
        )
      }
    }else if(!this.props.isOpened && this.props.isFlagged){
      cell = (
        <div className="closed flag">F</div>
      )
    }else{
      cell = (
        <div className="closed"></div>
      )
    }

    return cell;
  }
  render() {
    return(
      <td className="cell" onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>
        {this.renderCell()}
      </td>
    );
  }
}

export default Cell;
