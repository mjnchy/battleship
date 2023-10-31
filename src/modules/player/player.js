import { Gameboard } from "../gameboard/gameboard";

function Player () {
  let player1 = Gameboard("player1"),
  player2 = Gameboard("player2"),
  currentPlayer = player1;

  function switchPlayer () {
    currentPlayer = currentPlayer == player2? player1: player2;
  };

  function  attack (x, y) {
    const enemy = currentPlayer == player1? player2: player1;
    if (enemy.isAttacked(x, y)) return "Cannot attack the same cordinates twice.";
    enemy.receiveAttack(x, y);
    currentPlayer.enemyMap.tracker[enemy.map.grid[x][y].identifier] = true;
    currentPlayer.enemyMap.totalAtks++;
    switchPlayer();
  };

  return {
    player1,
    player2,
    attack
  };
};

export { Player };
