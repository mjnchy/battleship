import { Gameboard } from "../gameboard/gameboard.js";

function Player (name) {
  const player = Gameboard();
  return {
    name, ...player,
    attack: (enemy, x, y) => {
      const target = enemy.map.grid[x][y];
      const status = enemy.receiveAttack(x, y);
      player.enemyMap.attacked[target.identifier] = true;
      player.enemyMap.totalAtks++;
      return status;
    },
  };
};

function Gameboard () {
  const map = createBoard(), enemyMap = createBoard(), ships = [];
  map.failed = [];
  enemyMap.success = [];

  return {
    map, enemyMap, ships,
    isAttacked: (x, y) => map.attacked[map.grid[x][y].identifier],    
    allShipsSunk: () => ships.every(ship => ship.isSunk()),

    placeShip: (arg) => {
      const newShip = Ship(arg.ship);
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

function Ship (name, length = shipLength) {
  let ship = {
    name,
    length: length[name],
    hitCount: 0,
    sunk: false,
  };

  return { ...ship,
    hit: () => ship.hitCount < ship.length? ++ship.hitCount: null,
    isSunk: () => ship.hitCount == ship.length? ship.sunk = true: false,
  };
};

export { Player };
