function Gameboard () {
  return {
    board1: createGrid(), board2: createGrid(), board3:createGrid(), board4: createGrid(),

    placeShip: function (grid, corX, corY) {
      let cell = this[grid][corX][corY];
      cell.housesShip = true;
    },
  };
};

function createGrid () {
  const rows = 10;
  const columns = 10;
  const grid = [];

  for (let i = 0; i < columns; i++) {
    grid[i] = [];
    for (let j = 0; j < rows; j++) {
      grid[i][j] = {
        cell: j+(i*columns),
        housesShip: false,
        ship: null,
      };
    }
  }

  return grid;
};

export { Gameboard };
