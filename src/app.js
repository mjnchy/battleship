import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { shipParameters, drawBoards, toggleSetupPrompt, interact, interactables, getCor, setupStatBoards, initializeGame } from "./modules/DOM/dom.js";
import { getValidAttackCor, placeShipsOnEnemyBoard } from "./modules/gameai/gameai.js";

window.onload = () => {
  const player1 = Player("player1"), player2 = Player("player2");
  let currentPlayer = "player1";

  initializePreGame(player1);

  function placeShips () {
    shipPlacer(player1, player2);
  };

  function attack (e) {
    playerAttack(e, player1, player2, currentPlayer);
    currentPlayer = "player2";
    computerAttack(player1, player2, currentPlayer);
    currentPlayer = "player1";
  };

  interactables.shipPlacer.addEventListener("click", placeShips);
  interactables.enemyMap.addEventListener("click",  attack);
};

function initializePreGame (player1) {
  drawBoards([[player1.map.grid, "player-map"], [player1.enemyMap.grid, "enemy-map"]]);
  toggleSetupPrompt();
  interact();
};

function shipPlacer(player, enemy) {
  Object.keys(shipParameters).forEach(ship => {
    player.placeShip(shipParameters[ship]);
    const element = document.querySelector(`.temp-ship-img[data-name="${ship}"]`);
    element.parentElement.removeChild(element);
    delete(shipParameters[ship]);
  });
  if (player.ships.length == 5) {
    toggleSetupPrompt();
    setupStatBoards();
    initializeGame();
    placeShipsOnEnemyBoard(enemy.map.grid, enemy.placeShip);
  };
};

function playerAttack (e, player, enemy, currentPlayer) {
  if (currentPlayer != "player1") return;
  const cor = getCor(e.target.dataset.identifier);
  player.attack(enemy, ...cor);
};

function computerAttack (player, computer, currentPlayer) {
  if (currentPlayer != "player2") return;
  computer.attack(player, ...getValidAttackCor());
};
