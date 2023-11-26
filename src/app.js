import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { drawBoards, setupPrompt } from "./modules/DOM/dom.js";
import { interact } from "./modules/DOM/interaction.js";

function highlightShipLocation (arr) {
  arr.forEach(identifier => document.querySelector(`#player-map>.cell[data-identifier="${identifier}"]`).style.backgroundColor = "red")};

function getParams (e) {
  const selected = document.querySelector(".selected");
  const identifier = e.target.dataset.identifier;
  const axis = document.querySelector("#axis-selected").dataset.value;
  if (!selected) return alert("A ship must be selected before it can be placed. Please select a ship.");
  return [ selected.dataset.name, Math.floor(identifier/10), identifier%10, axis ];
};

window.onload = () => {
  const player1 = Player("player1");
  const player2 = Player("player2");
   
  drawBoards([[player1.map.grid, "player-map"], [player1.enemyMap.grid, "enemy-map"]]);
  setupPrompt();
  interact();

  document.querySelector("#player-map").addEventListener("click", e => player1.placeShip(...getParams(e), highlightShipLocation, false))
};
