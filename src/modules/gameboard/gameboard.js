import { Ship } from "../ship/ship.js";

function Gameboard (name) {
  let map = createBoard(),
  enemyMap = createBoard();

  map.failed = [];
  enemyMap.success = [];

  function placeShip (ship, x, y) {
    if (map.grid[x][y].ship) throw new Error("Cannot place two ships at the same cordinates.");
    map.grid[x][y].ship = Ship(ship);
  };

  function receiveAttack (x, y) {
    const cor = [x, y];
    const target = map.grid[x][y];
    map.tracker[target.identifier] = true;
    target.ship? map.grid[x][y].ship.hit(): map.failed.push(cor);
    map.totalAtks++;
  };

  return {
    name,
    map,
    enemyMap,
    placeShip,
    receiveAttack
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
        identifier,
        ship: null,
      };
      board.tracker[identifier] = false;
    }
  }

  return board;
};

export { Gameboard };
