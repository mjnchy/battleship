function Gameboard () {
  const board = {
    player: {
      name: "p1",
      grid: createBoard(),
      atkGrid: createBoard(),
    },
    enemy: {
      name: "p2",
      grid: createBoard(),
      atkGrid: createBoard(),
    }
  };
    
  return {
  };
};

function createBoard () {
  const rows = 10;
  const columns = 10;
  const board = {
    grid: [],
    tracker: [],
    totalAtks: 0,
  };

  for (let i = 0; i < columns; i++) {
    board.grid = [];
    for (let j = 0; j < rows; j++) {
      let identifier = j+(i * columns);
      board.grid[i][j] = {
        cell: identifier,
        housesShip: false,
        ship: null,
      };

      board.tracker[identifier] = false;
    }
  }

  return board;
};

function setBoard () {}

export { Gameboard };
