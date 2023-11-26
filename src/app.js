import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { drawBoards, setupPrompt } from "./modules/DOM/dom.js";
import { interact } from "./modules/DOM/interaction.js";

const shipParameters = {};

function mark (arr, addClass, className, ship, unmark = false) {
  if (unmark == true) {
    document.querySelectorAll(`#player-map>.cell[data-ship="${ship}"]`).forEach(cell => {
      delete(cell.dataset.ship);
      cell.classList.remove("mark");
    });
  };
  arr.forEach(identifier => {
    const cell = document.querySelector(`#player-map>.cell[data-identifier="${identifier}"]`);
    cell.dataset.ship = ship;
    addClass == true? cell.classList.add(className): cell.classList.remove(className);
  });
};
  
function getParams (e, Alert) {
  const selected = document.querySelector(".selected");
  const identifier = e.target.dataset.identifier;
  const axis = document.querySelector("#axis-selected").dataset.value;
  if (!selected) {
    if (Alert == false) return null
    else return alert("A ship must be selected before it can be placed. Please select a ship.");
  }
  return [ selected.dataset.name, Math.floor(identifier/10), identifier%10, axis ];
};

window.onload = () => {
  const player1 = Player("player1");
  const player2 = Player("player2");
   
  drawBoards([[player1.map.grid, "player-map"], [player1.enemyMap.grid, "enemy-map"]]);
  setupPrompt();
  interact();

  function updateShipOnMap (e, addClass, className, alert, storeParams = false, unmark) {
    if (!e.target.classList.contains("cell")) return;
    const params = getParams(e, alert);
    if (!Array.isArray(params)) return;
    player1.placeShip(...getParams(e), mark, addClass, className, true, unmark);
    if (storeParams == true) shipParameters[params[0]] = [...params];
  };

  document.querySelector("#player-map").addEventListener("click", e => updateShipOnMap(e, true, "mark", true, true, true));
  document.querySelectorAll("#player-map>.cell").forEach(cell => {
    cell.addEventListener("mouseenter", e => updateShipOnMap(e, true, "highlight", false));
    cell.addEventListener("mouseleave", e => updateShipOnMap(e, false, "highlight", false));
  });
};
