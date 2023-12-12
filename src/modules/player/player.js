import { Gameboard } from "../gameboard/gameboard.js";

function Player (name) {
  const player = Gameboard();
  return {
    name, ...player,
    attack: (enemy, x, y) => {
      const target = enemy.map.grid[x][y];
      enemy.receiveAttack(x, y);
      player.enemyMap.attacked[target.identifier] = true;
      player.enemyMap.totalAtks++;
    },
  };
};

export { Player };
