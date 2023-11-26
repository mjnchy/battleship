import { Ship } from "../ship/ship.js";

function Gameboard () {
  const map = createBoard(), enemyMap = createBoard(), ships = [];
  map.failed = [];
  enemyMap.success = [];

  return {
    map, enemyMap,
    isAttacked: (x, y) => map.attacked[map.grid[x][y].identifier],    
    allShipsSunk: () => ships.every(ship => ship.isSunk()),

    placeShip: (ship, x, y, orientation = "horizontal", cb, highlight = false) => {
      const target = map.grid[x][y], newShip = Ship(ship);
      if (target.ship) return "Cannot place two ships at the same cordinate.";
      if (!newShip.length > 1) target.ship = newShip;
      if (orientation != "vertical" && orientation != "horizontal")
      throw new Error("Invalid orientation. Ships can only be placed either horizontally or vertically.");
      
      const arr = [], idArr = [],
      halfLength = Math.floor(newShip.length/2);

      let start = orientation == "vertical"? x - halfLength: y - halfLength;
      start < 0? start = 0: null;
      let end = start + newShip.length; 
      if (end > 9) { end = 10; start = end - newShip.length; };
      
      for (let i = start; i < end; i++) arr.push(orientation == "vertical"? [i, y]: [x, i])

      if (highlight == true) {
        arr.forEach(newCor => idArr.push(map.grid[newCor[0]][newCor[1]].identifier))
      } else {
        arr.forEach(newCor => { const node = map.grid[newCor[0]][newCor[1]]; node.ship = newShip; idArr.push(node.identifier); });
        ships.push(newShip);
      };
      return cb? cb(idArr): idArr;
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
