import { Ship } from "../ship/ship.js";

function Gameboard (name) {
  const map = createBoard(), enemyMap = createBoard();
  map.failed = [];
  enemyMap.success = [];

  return {
    name, map, enemyMap,
    isAttacked: (x, y) => map.attacked[map.grid[x][y].identifier],
    
    placeShip: (ship, x, y) => {
      let target = map.grid[x][y]
        target.ship? "Cannot place two ships at the same cordinates": target.ship = Ship(ship);
    },

    receiveAttack: (x, y) => {
      const target = map.grid[x][y];
      map.attacked[target.identifier] = true;
      target.ship? target.ship.hit(): map.failed.push([x, y]);
      map.totalAtks++;
    },
  };
};

function createBoard () {
  const rows = 10,
  columns = 10,
  board = { grid: [], attacked: [], totalAtks: 0 };

  for (let i = 0; i < columns; i++) {
    board.grid[i] = [];
    for (let j = 0; j < rows; j++) {
      const identifier = j+(i * columns);
      board.grid[i][j] = { identifier, ship: null };
      board.attacked[identifier] = false;
    }
  }

  return board;
};

export { Gameboard };
