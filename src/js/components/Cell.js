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
  render() {
    return(
      <td className="cell" onClick={this.props.onClick} onContextMenu={this.props.onContextMenu}>
        {this.renderCell()}
      </td>
    );
  }
}

export default Cell;
