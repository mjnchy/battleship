import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { shipParameters, drawBoards, toggleSetupPrompt, interact, interactables, getCor, setupStatBoards, initializeGame, updateAttackedCor } from "./modules/DOM/dom.js";
import { getValidAttackParameters, placeShipsOnEnemyBoard } from "./modules/gameai/gameai.js";

let player1, player2, currentPlayer;

window.onload = () => {
  player1 = Player("player1"); player2 = Player("player2"); currentPlayer = player1;
  initializePlacements();
  initializeAttacks();
};

function initializePlacements () {
  drawBoards([[player1.map.grid, "player-map"], [player1.enemyMap.grid, "enemy-map"]]);
  toggleSetupPrompt();
  interact();
  interactables.shipPlacer.addEventListener("click", placeShips);
};

function placeShips () {
  Object.keys(shipParameters).forEach(ship => {
    player1.placeShip(shipParameters[ship]);
    const element = document.querySelector(`.temp-ship-img[data-name="${ship}"]`);
    element.parentElement.removeChild(element);
    delete(shipParameters[ship]);
  });
  if (player1.ships.length == 5) {
    toggleSetupPrompt();
    setupStatBoards();
    initializeGame();
    placeShipsOnEnemyBoard(player2.map.grid, player2.placeShip);
  };
};

function attack (e) {
  const target = e.target, identifier = parseInt(target.dataset.identifier), cor = getCor(identifier);
  if (currentPlayer != player1 || target.classList.contains("attacked") || player2.isAttacked(...cor)) return;

  interactables.enemyMap.classList.add("disabled");
  player1.attack(player2, ...cor);
  updateAttackedCor("player", target, identifier, player2.map.grid[cor[0]][cor[1]].ship != null);
  switchPlayer();
  setTimeout(() => computerAttack(), 750);
};

function computerAttack () {
  if (currentPlayer != player2) return;

  let attackParams = getValidAttackParameters();
  while (player1.isAttacked(...attackParams.cor)) attackParams = getValidAttackParameters();

  const target = document.querySelector(`#player-map>.cell[data-identifier="${attackParams.identifier}"]`);
  interactables.enemyMap.classList.remove("disabled");
  player2.attack(player1, ...attackParams.cor);
  updateAttackedCor("computer", target, attackParams.identifier, player1.map.grid[attackParams.cor[0]][attackParams.cor[1]].ship != null);
  switchPlayer();
};

function switchPlayer () {
  currentPlayer = currentPlayer == player1? player2: player1;
};

function initializeAttacks () {
  interactables.enemyMap.addEventListener("click",  attack);
};
