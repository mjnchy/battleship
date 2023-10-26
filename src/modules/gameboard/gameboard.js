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

  board.player.atk.successfulAtks = [];
  board.enemy.atk.successfulAtks = [];
  board.player.atk.unsuccessfulAtks = [];
  board.enemy.atk.unsuccessfulAtks = [];
    
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

      if (board.enemy.map.tracker[target.cell] == true) return "cannot attack the cordinate twice";
      board.enemy.map.tracker[target.cell] = true;
      board.player.atk.tracker[target.cell] = true;
      board.enemy.map.atkCors.push(target.cell);
      board.player.atk.atkCors.push(target.cell);
      board.enemy.map.totalAtks++;
      board.player.atk.totalAtks++;
      
      if (!target.ship) {
        board.player.atk.unsuccessfulAtks.push(target.cell);
        return"no ships were hit"
      };
      board.player.atk.successfulAtks.push(target.cell);
      target.ship.hit();
      trackerTarget.housesShip = true;
      return "a ship was hit.";
    },
  };
};

function createBoard () {
  const rows = 10;
  const columns = 10;
  const board = {
    grid: [],
    tracker: [],
    atkCors: [],
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
    carrier: Ship("carrier", 5),
    battleship: Ship("battleship", 4),
    destroyer: Ship("destroyer", 3),
    submarine: Ship("submarine" ,2),
    patrolboat: Ship("patrolboat", 1),
  };
};

function setBoard () {}

export { Gameboard };
