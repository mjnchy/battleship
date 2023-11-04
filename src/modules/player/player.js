import { Gameboard } from "../gameboard/gameboard.js";

function Player (name, enemy) {
  const player = Gameboard();
  return {
    name, ...player,
    attack: (x, y) => {
      const target = enemy.map.grid[x][y];
      if (target.isAttacked) return "Cannot attack the same cordinates twice";
      enemy.receiveAttack(x, y);
      player.enemyMap.attacked[target.identifier] = true;
      player.enemyMap.totalAtks++;
    },
  };
};

export { Player };
