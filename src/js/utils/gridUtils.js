export const createGrid = (rows, columns, mines) => {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push([]);
    for (let j = 0; j < columns; j++) {
      grid[i].push({
        x: j,
        y: i,
        count: 0,
        isOpened: false,
        hasMine: false,
        isFlagged: false
      });
    }
  }
  for (let x = 0; x < mines; x++) {
    let cellX = Math.floor(Math.random() * rows);
    let cellY = Math.floor(Math.random() * columns);
    let cell = grid[cellX][cellY];
    if (cell.hasMine) {
      x--;
    } else {
      cell.hasMine = true;
      let fcn = (newX, newY) => {
        let nextCell = grid[newX][newY];
        nextCell.count++;
      };
      iterateSurroundingCells(grid, cellX, cellY, fcn);
    }
  }
  return grid;
};

export const iterateSurroundingCells = (grid, x, y, fcn) => {
  let cell = grid[x][y];
  for (let i = -1; i <= 1; i++) {
    if (grid[x + i]) {
      for (let j = -1; j <= 1; j++) {
        if (grid[x + i][y + j]) {
          fcn(x + i, y + j);
        }
      }
    }
  }
};
