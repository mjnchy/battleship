import { Ship } from "../ship/ship.js";

function Gameboard () {
  const map = createBoard(), enemyMap = createBoard(), ships = [];
  map.failed = [];
  enemyMap.success = [];

  return {
    map, enemyMap,
    isAttacked: (x, y) => map.attacked[map.grid[x][y].identifier],
    
    allShipsSunk: () => ships.every(ship => ship.isSunk()),

    placeShip: (ship, x, y, orientation = "vertical") => {
      const target = map.grid[x][y], newShip = Ship(ship);
      if (target.ship) return "Cannot place two ships at the same cordinate.";
      if (!newShip.length > 1) target.ship = newShip;

      const arr = [],
      halfLength = Math.floor(newShip.length/2),
      start = orientation == "vertical"? x - halfLength: y - halfLength; 
      
      for (let i = start; i < start + newShip.length; i++) {
        arr.push(orientation == "vertical"? [i, y]: [x, i])
      }

      arr.forEach(newCor => {
        map.grid[newCor[0]][newCor[1]].ship = newShip;
      });
      ships.push(newShip);
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
