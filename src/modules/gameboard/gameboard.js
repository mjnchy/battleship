import { Ship } from "../ship/ship.js";

function Gameboard () {
  const map = createBoard(), enemyMap = createBoard(), ships = [];
  map.failed = [];
  enemyMap.success = [];

  return {
    map, enemyMap, ships,
    isAttacked: (x, y) => map.attacked[map.grid[x][y].identifier],    
    allShipsSunk: () => ships.every(ship => ship.isSunk()),

    placeShip: (arg) => {
      if (typeof arg !== "object" || Array.isArray(arg))
      throw new Error("Argument can only be an object. Arrays and non-object variables are not accepted.");
      if (!arg.ship && !arg.arr && !arg.length) throw new Error("Invalid object.");
      const newShip = Ship(arg.ship);
      if (newShip.length != arg.length) throw new Error("Length mismatch");
      if (newShip.length != arg.arr.length) throw new Error("Array length and ship length mismatch.");

      arg.arr.forEach(cor => map.grid[cor[0]][cor[1]].ship = newShip);
      ships.push(newShip);
    },

    receiveAttack: (x, y) => {
      let hit = false
      const target = map.grid[x][y];
      map.attacked[target.identifier] = true;
      map.totalAtks++;
      if (!target.ship) map.failed.push([x, y])
      else { target.ship.hit(); hit = true; };

      return hit;
    },
  };
};

function createBoard () {
  const rows = 10,
  columns = 10,
  board = { grid: [], attacked: [], totalAtks: 0 };

  for (let i = 0; i < rows; i++) {
    board.grid[i] = [];
    for (let j = 0; j < columns; j++) {
      const identifier = j+(i * rows);
      board.grid[i][j] = { identifier, ship: null };
      board.attacked[identifier] = false;
    }
  }

  return board;
};

export { Gameboard };
