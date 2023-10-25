import { Ship } from "../ship/ship.js";

function Gameboard () {
  const board = {
    player: {
      name: "p1",
      map: createBoard(),
      atk: createBoard(),
      ships: createShips()
    },
    enemy: {
      name: "p2",
      map: createBoard(),
      atk: createBoard(),
      ships: createShips()
    }
  };
    
  return {
    board,

    placeShip: (ship, corX, corY) => {
      let target = board.player.map.grid[corX][corY];
      target.housesShip = true;
      target.ship = board.player.ships[ship];
    },

    receiveAttack: (corX, corY) => {
      const target = board.enemy.map.grid[corX][corY];
      const trackerTarget = board.player.atk.grid[corX][corY];

      if (board.enemy.map.tracker.includes(target.cell)) return "cannot attack the cordinate twice";
      board.enemy.map.tracker.push(target.cell);
      board.player.atk.tracker.push(target.cell);
      target.ship? target.ship.hit(): null;
      trackerTarget.housesShip = true;
      board.enemy.map.totalAtks++;
      board.player.atk.totalAtks++;
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
