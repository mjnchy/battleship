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
      let target = board.player.main.grid[corX][corY];
      target.housesShip = true;
      target.ship = board.player.ships[ship];
    },

    receiveAttack: (corX, corY) => {
      const target = board.player.main.grid[corX][corY];
      
      if (board.player.main.tracker.includes(target.cell)) return "cannot attack the cordinate twitce"
      else {
        board.player.main.tracker.push(target.cell);
        target.ship.hit();
        board.player.main.totalAtks++;
      };
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
    }
  }

  return board;
};

function createShips () {
  return {
    carrier: Ship("carrier", 5),
    battleship: Ship("battleship", 4),
    destroyer: Ship("destroyer", 3),
    submarine: Ship("submarine" ,2),
    patrolboat: Ship("patrolboat", 1),
  };
};

function setBoard () {}

export { Gameboard };
