import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { shipParameters, drawBoards, toggleSetupPrompt, interact, interactables, setupStatBoards } from "./modules/DOM/dom.js";

window.onload = () => {
  const player1 = Player("player1");
  const player2 = Player("player2");
   
  drawBoards([[player1.map.grid, "player-map"], [player1.enemyMap.grid, "enemy-map"]]);
  toggleSetupPrompt();
  interact();

  function place () {
    Object.keys(shipParameters).forEach(ship => {
      player1.placeShip(shipParameters[ship]);
      const element = document.querySelector(`.temp-ship-img[data-name="${ship}"]`);
      element.parentElement.removeChild(element);
      delete(shipParameters[ship]);
    });
    if (player1.ships.length == 5) {
      toggleSetupPrompt();
      setupStatBoards();
    }
  }; 

  interactables.shipPlacer.addEventListener("click", place);
};
