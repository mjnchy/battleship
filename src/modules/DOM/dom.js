const domElems = Object.freeze({
  gameBoardContainer: document.querySelector("#gameboard-container"),
  setupOverlay: document.querySelector("#ship-placement-overlay"),
  statBoards: [...document.querySelectorAll(".stats-board")],
}), shipParameters = {};

let interactables = {};

function getInteractables () {
  return Object.freeze({
    playerMap: document.querySelector("#player-map"),
    playerGrid: [...document.querySelectorAll("#player-map>.cell")],
    enemyMap: document.querySelector("#enemy-map"),
    enemyGrid: [...document.querySelectorAll("#enemy-map>.cell")],
    axisSelected: document.querySelector("#axis-selected"),
    axisBtn: document.querySelector("#axis-selected-btn"),
    axisList: document.querySelector("#axis-drop-down-list"),
    axisOptions: [...document.querySelectorAll(".axis-drop-down-item")],
    shipsOnDeck: [...document.querySelectorAll(".temp-ship-img")],
    shipPlacer: document.querySelector("#placer-btn"),
  });
};

function drawBoards (arr) {
  if (!Array.isArray(arr)) throw new Error("makeBoards can only accept an array parameter. Parameter type is not an array.");
  if (arr.length != 2) throw new Error("Array parameter can only take a maximum of two items.");

  arr.forEach(innerArr => {
    const newBoard = document.createElement("div");
    newBoard.id = `${innerArr[1]}`;
    newBoard.classList.add("board");

    innerArr[0].forEach(row => {
      row.forEach(column => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.id = `cell-${column.identifier}`;
        div.dataset.identifier = column.identifier;
        newBoard.append(div);
      });
    });
    domElems.gameBoardContainer.append(newBoard);
    interactables = getInteractables();
  });
};

function toggleSetupPrompt () {
  domElems.setupOverlay.classList.toggle("visible");
};

function setupStatBoards () {
  domElems.statBoards.forEach(ship => {
    ship.classList.toggle("visible");
  });
};

function toggleAxisMenu (menu, button) { 
  menu.classList.contains("expanded")? button.blur(): null;
  menu.classList.toggle("expanded");
};

function externalMenuCollapse (element) {
  if (!interactables.axisList.classList.contains("expanded")) return;
  if (element != interactables.axisBtn && element != interactables.axisSelected && !interactables.axisOptions.includes(element))
  interactables.axisList.classList.toggle("expanded");
};

function deselect (target) {
  const exceptions = [ interactables.playerMap, interactables.axisSelected, interactables.axisList,
    ...interactables.axisOptions, ...interactables.shipsOnDeck, ...interactables.playerGrid],
  exceptionMatched = exceptions.some(exception => exception == target), 
  selected = document.querySelector(".temp-ship-img.selected");

  if (exceptionMatched == true) return;
  selected? selected.classList.remove("selected"): null;
};

function selectAxis (element, val, button, list) {
  const otherOption = element.nextElementSibling? element.nextElementSibling: element.previousElementSibling;
  element.classList.add("current");
  otherOption.classList.remove("current");
  
  val.dataset.value = element.dataset.value;
  val.textContent = element.textContent;
  button.blur();
  list.classList.toggle("expanded");
};

function selectShip (ship) {
  document.querySelectorAll(".temp-ship-img.selected").forEach(selected => selected.classList.remove("selected"));
  ship.classList.add("selected");
};

function updateShipOnMap (ev, className = "mark", addClass = true, postAlert = true) {
  const selected = document.querySelector(".selected");
  if (!selected) return postAlert == false? null:
  alert("A ship has to be selected before it can be placed. Please select a ship and try again.");

  const name = selected.dataset.name, length = selected.dataset.length,
  axis = document.querySelector("#axis-selected").dataset.value;
  if (axis != "horizontal" && axis != "vertical") throw new Error("Invalid axis. Axis can only be horizontal or vertical");

  const arr = getArr(parseInt(ev.target.dataset.identifier), axis, parseInt(length));
  
  if (className == "mark") {
    let currentShip;
    const filled = arr.some(subArr => {
      const cell = document.querySelector(`#player-map>.cell[data-identifier="${subArr[0]*10 + subArr[1]}"]`);
      if (cell.classList.contains("mark")) {
        currentShip = cell.dataset.name;
        return true;
      } return false;
    });
    if (filled == true && currentShip != name) return;

    document.querySelectorAll(`#player-map>.cell[data-name="${name}"]`).forEach(cell => {
      cell.classList.remove("mark");
      delete(cell.dataset.name)
    });
    
    arr.forEach(subArr => {
      const cell = document.querySelector(`#player-map>.cell[data-identifier="${subArr[0]*10 + subArr[1]}"]`);
      cell.classList.add("mark");
      cell.dataset.name = selected.dataset.name;
    });
    setShipParameters(name, arr, length);
  } else { arr.forEach(subArr => {
      const cell = document.querySelector(`#player-map>.cell[data-identifier="${subArr[0]*10 + subArr[1]}"]`);
      addClass == true? cell.classList.add(className): cell.classList.remove(className);
    });
  };
};

function getArr (identifier, axis, length) {
  const cor  = getCor(identifier), x = cor[0], y = cor[1], halfLength = Math.floor(length/2), arr = [];

  let start = axis == "vertical"? x - halfLength: y - halfLength;
  if (start < 0) start = 0;
  let end = start + length;
  if (end > 9) end = 10; start = end - length;

  if (axis == "horizontal") for (let i = start; i < end; i++) arr.push([x, i])
  else for (let i = start; i < end; i++) arr.push([i, y])

  return arr;
};

function getCor (identifier) {
  return [ Math.floor(identifier/10), identifier%10 ];
};

function setShipParameters (ship, arr, length) {
  shipParameters[ship] = { ship, arr, length };
};

function mouseEnter (e) {
  updateShipOnMap(e, "highlight", true, false);
};

function mouseLeave (e) {
  updateShipOnMap(e, "highlight", false, false);
};

function highlightAtkCor (e, addClass = true) {
  addClass == true? e.target.classList.add("enemy-highlight"): e.target.classList.remove("enemy-highlight");
};

function removeHighlightFromAtkCor (e) {
  highlightAtkCor(e, false);
};

function markAndDisableAttackedCor (target, identifier, arr) {
  const marker = document.createElement("div");

  marker.id = `cell-${identifier}-marker`;
  marker.classList.add("attacked");
  target.classList.remove("enemy-highlight");
  target.appendChild(marker);
  target.removeEventListener("mouseenter", highlightAtkCor);
  target.removeEventListener("mouseleave", removeHighlightFromAtkCor);
  arr.push(identifier);
};

function interact () {
  window.addEventListener("click", e => {
    const target = e.target;
    deselect(target);
    externalMenuCollapse(target);

    switch (true) {
      case target == interactables.axisSelected || target == interactables.axisBtn:
        toggleAxisMenu(interactables.axisList, interactables.axisBtn); 
        break;

      case interactables.axisOptions.includes(target):
        selectAxis(target, interactables.axisSelected, interactables.axisBtn, interactables.axisList);
        break;

      case interactables.shipsOnDeck.includes(target):
        selectShip(target);
        break;
    };
  });

  interactables.playerMap.addEventListener("click", updateShipOnMap);
  interactables.playerGrid.forEach(cell => {
    cell.addEventListener("mouseenter", mouseEnter);
    cell.addEventListener("mouseleave", mouseLeave);
  });
};

function initializeGame () {
  interactables.playerMap.removeEventListener("click", updateShipOnMap);
  interactables.playerGrid.forEach(cell => {
    cell.removeEventListener("mouseenter", mouseEnter);
    cell.removeEventListener("mouseleave", mouseLeave);
  });

  interactables.enemyGrid.forEach(cell => {
    cell.addEventListener("mouseenter", highlightAtkCor);
    cell.addEventListener("mouseleave", removeHighlightFromAtkCor);
  });
};

export { shipParameters, interactables, drawBoards, toggleSetupPrompt, getArr, getCor, interact, setupStatBoards, initializeGame, markAndDisableAttackedCor, };
