import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { shipParameters, drawBoards, toggleSetupPrompt, interact, interactables, getCor, setupStatBoards, initializeGame, updateAttackedCor } from "./modules/DOM/dom.js";
import { getValidAttackParameters, placeShipsOnEnemyBoard } from "./modules/gameai/gameai.js";
import { endGame } from "./modules/loop/loop.js";

let player1, player2, currentPlayer;

window.onload = () => {
  player1 = Player("player1"); player2 = Player("player2"); currentPlayer = player1;
  initializePlacements();
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
    const element = document.querySelector(`.ship[data-name="${ship}"]`);
    element.parentElement.removeChild(element);
    delete(shipParameters[ship]);
  });
  if (player1.ships.length == 5) {
    toggleSetupPrompt();
    setupStatBoards();
    initializeGame();
    placeShipsOnEnemyBoard(player2.map.grid, player2.placeShip);
    initializeAttacks();
  };
};

function attack (e) {
  const target = e.target, identifier = parseInt(target.dataset.identifier), cor = getCor(identifier);
  if (currentPlayer != player1 || target.classList.contains("attacked") || player2.isAttacked(...cor)) return;

  const shipHit = player1.attack(player2, ...cor);
  updateAttackedCor("player", target, identifier, player2.map.grid[cor[0]][cor[1]].ship != null);

  if (shipHit) {
    if (!player2.allShipsSunk()) return;
    return endGame("win");
  }; 
  switchPlayer();
  computerAttack();
};

function computerAttack (followUp = false, prevAtkParams = null, delay = 500) {
  setTimeout(() => {
    let attackParams = getValidAttackParameters();
    while (player1.isAttacked(...attackParams.cor)) attackParams = getValidAttackParameters();

    const target = document.querySelector(`#player-map>.cell[data-identifier="${attackParams.identifier}"]`);
    let shipHit = player2.attack(player1, ...attackParams.cor);
    updateAttackedCor("computer", target, attackParams.identifier, player1.map.grid[attackParams.cor[0]][attackParams.cor[1]].ship != null);
    if (shipHit) {
      if (!player1.allShipsSunk()) return computerAttack(true, attackParams, 1500);
      return endGame("lost");
    };
    switchPlayer();
  }, delay);
};

function switchPlayer () {
  currentPlayer = currentPlayer == player1? player2: player1;
  interactables.enemyMap.classList.toggle("disabled");
};

function initializeAttacks () {
  interactables.enemyMap.addEventListener("click",  attack);
};

