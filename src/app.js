import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { shipParameters, drawBoards, toggleSetupPrompt, interact, interactables, getCor, setupStatBoards, initializeGame, markAndDisableAttackedCor } from "./modules/DOM/dom.js";
import { getValidAttackCor, placeShipsOnEnemyBoard } from "./modules/gameai/gameai.js";

const attackedIdentifiers = [];
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
  const target = e.target, identifier = parseInt(target.dataset.identifier);
  if (currentPlayer != player1 || target.classList.contains("attacked") || attackedIdentifiers.includes(identifier)) return;

  player1.attack(player2, ...getCor(identifier));
  markAndDisableAttackedCor(target, identifier, attackedIdentifiers);
  switchPlayer();
  computerAttack();
};

function computerAttack () {
  if (currentPlayer != player2) return;
  player2.attack(player1, ...getValidAttackCor());
  switchPlayer();
};

function switchPlayer () {
  currentPlayer = currentPlayer == player1? player2: player1;
};

function initializeAttacks () {
  interactables.enemyMap.addEventListener("click",  attack);
};
