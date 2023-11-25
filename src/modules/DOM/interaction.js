import { deselect, externalMenuCollapse, selectAxis, selectShip, toggleAxisMenu } from "./interaction_import_module";

function getInteractables () {
  return Object.freeze({
    playerMap: document.querySelector("#player-map"),
    playerGrid: [...document.querySelectorAll("#player-map>.cell")],
    axisSelected: document.querySelector("#axis-selected"),
    axisList: document.querySelector("#axis-drop-down-list"),
    axisOptions: [...document.querySelectorAll(".axis-drop-down-item")],
    shipsOnDeck: [...document.querySelectorAll(".temp-ship-img")],
  });
};

function interact () {
  const interactables = getInteractables();

  window.addEventListener("click", e => {
    const target = e.target;
    externalMenuCollapse(target, interactables.axisSelected, ...interactables.axisOptions, interactables.axisList);
    deselect(target, [interactables.axisSelected, interactables.axisList, ...interactables.axisOptions,
      ...interactables.shipsOnDeck, ...interactables.playerGrid]);

    switch (target) {
      case interactables.axisSelected:
        toggleAxisMenu(interactables.axisList, interactables.axisSelected); 
        break;

      case interactables.axisOptions[0]:
        selectAxis(target, interactables.axisSelected, interactables.axisList);
        break;

      case interactables.axisOptions[1]:
        selectAxis(target, interactables.axisSelected, interactables.axisList);
        break;
    };
  }); 

  interactables.shipsOnDeck.forEach(ship => {
    ship.addEventListener("click", selectShip);
  });
};

export { interact };
