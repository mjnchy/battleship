import { Ship } from "../ship/ship.js";

function Gameboard () {
  const board = {
    player: {
      name: "p1",
      main: createBoard(),
      atk: createBoard(),
      ships: createShips()
    },
    enemy: {
      name: "p2",
      main: createBoard(),
      atk: createBoard(),
      ships: createShips()
    }
  };
    
  return {
    board,

    placeShip: (ship, corX, corY) => {
      let cor = board.player.main.grid[corX][corY];
      cor.housesShip = true;
      cor.ship = board.player.ships[ship];
    },
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
    board.grid[i] = [];
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

function createShips () {
  return {
    carrier: Ship(5),
    battleship: Ship(4),
    destroyer: Ship(3),
    submarine: Ship(2),
    patrolboat: Ship(1),
  };
};

function setBoard () {}

export { Gameboard };
