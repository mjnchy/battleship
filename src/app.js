import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { drawBoards, setupPrompt } from "./modules/DOM/dom.js";
import { interact } from "./modules/DOM/interaction.js";

window.onload = () => {
  const player1 = Player("player1");
  const player2 = Player("player2");

  function getParams (e) {
    const selected = document.querySelector(".selected");
    if (!selected) return alert("A ship must be selected before it can be placed. Please select a ship.");
    const identifier = e.target.dataset.identifier, axis = document.querySelector("#axis-selected").dataset.value;
    return [ selected.dataset.name, Math.floor(identifier/10), identifier%10, axis ];
  };
  
  drawBoards([[player1.map.grid, "player-map"], [player1.enemyMap.grid, "enemy-map"]]);
  setupPrompt();
  interact();

  document.querySelector("#player-map").addEventListener("click", getParams);
};
