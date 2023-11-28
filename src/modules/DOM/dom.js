const domElems = Object.freeze({
  gameBoardContainer: document.querySelector("#gameboard-container"),
  setupOverlay: document.querySelector("#ship-placement-overlay"),
}), shipParams = {};

let interactables = {};

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

function setShipParams (ship, arr, length) {
  shipParams.ship = ship; shipParams.arr = arr; shipParams.length = length;
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

function setupPrompt () {
  domElems.setupOverlay.classList.toggle("visible");
};

function toggleAxisMenu (menu, button) { 
  menu.classList.contains("expanded")? button.blur(): null;
  menu.classList.toggle("expanded");
};

function externalMenuCollapse (element, button, option1, option2, list) {
  if (!list.classList.contains("expanded")) return;
  if (element != button && element != option1 && element != option2)
  list.classList.toggle("expanded");
};

function selectAxis (element, button, list) {
  const otherOption = element.nextElementSibling? element.nextElementSibling: element.previousElementSibling;
  element.classList.add("current");
  otherOption.classList.remove("current");
  
  button.dataset.value = element.dataset.value;
  button.textContent = element.textContent;
  list.classList.toggle("expanded");
};

function selectShip (ship) {
  document.querySelectorAll(".temp-ship-img.selected").forEach(selected => selected.classList.remove("selected"));
  ship.classList.add("selected");
};

function deselect (target, exceptions) {
  const exceptionMatched = exceptions.some(exception => exception == target), 
  selected = document.querySelector(".temp-ship-img.selected");
  if (exceptionMatched == true) return;
  selected? selected.classList.remove("selected"): null;
};

function getArg (e, selected, orientation) {
  const identifier = parseInt(e.target.dataset.identifier), x = Math.floor(identifier/10), y = identifier%10,
  ship = selected.dataset.name, length = parseInt(selected.dataset.length),
  arr = [], halfLength = Math.floor(length/2);

  let start = orientation == "vertical"? x - halfLength: y - halfLength;
  if (start < 0) start = 0;
  let end = start + length;
  if (end > 9) end = 10; start = end - length;

  for(let i = start; i < end; i++) arr.push(orientation == "vertical"? [i, y]: [x, i]);
  return { ship, arr, length };
};

function updateShipOnMap (e, addClass = true, className, Alert = false) {
  const selected = document.querySelector(".temp-ship-img.selected"),
  orientation = document.querySelector("#axis-selected").dataset.value;

  if (!selected) return Alert == false? null: alert("A ship must be selected before it can be placed. Please select a ship.");
  if (orientation != "vertical" && orientation != "horizontal") 
  throw new Error("Invalid orientation. Orientation can only be vertical or horizontal.");
  
  const args = getArg(e, selected, orientation);
  
  if (className == "mark") {
    document.querySelectorAll("#player-map>.cell.mark").forEach(cell => cell.classList.remove("mark"));
    setShipParams(args.ship, args.arr, args.length);
  };

  args.arr.forEach(cor => {
    const identifier = cor[0]*10 + cor[1], cell = document.querySelector(`#player-map>.cell[data-identifier="${identifier}"]`);
    addClass == true? cell.classList.add(className): cell.classList.remove(className);
  });

};

function dragStart (e) {
  e.target.classList.add("selected");
  e.dataTransfer.setData("text/plain", e.target);
  // setTimeout(() => e.target.parentElement.removeChild(e.target), 0);
};

function dragEnd (e) {
  console.log("end");
};

function dragEnter (e) {
  e.preventDefault();
  updateShipOnMap(e, true, "highlight");
};

function dragOver (e) {
  e.preventDefault();
};

function dragLeave (e) {
  updateShipOnMap(e, false, "highlight");
};

function drop (e) {
  updateShipOnMap(e, true, "mark", true);
};

function interact () {
  window.addEventListener("click", e => {
    const target = e.target;
    externalMenuCollapse(target, interactables.axisSelected, ...interactables.axisOptions, interactables.axisList);
    deselect(target, [interactables.playerMap, interactables.axisSelected, interactables.axisList,
      ...interactables.axisOptions, ...interactables.shipsOnDeck, ...interactables.playerGrid]);

    switch (true) {
      case target == interactables.axisSelected:
        toggleAxisMenu(interactables.axisList, interactables.axisSelected); 
        break;

      case interactables.axisOptions.includes(target):
        selectAxis(target, interactables.axisSelected, interactables.axisList);
        break;

      case interactables.shipsOnDeck.includes(target):
        selectShip(target);
        break;
    };
  });

  interactables.shipsOnDeck.forEach(ship => {
    ship.addEventListener("dragstart", dragStart);
    ship.addEventListener("dragend", dragEnd);
  });

  interactables.playerMap.addEventListener("click", e => updateShipOnMap(e, true, "mark", true));
  interactables.playerMap.addEventListener("drop", drop);
  interactables.playerGrid.forEach(cell => {
    cell.addEventListener("mouseenter", e => updateShipOnMap(e, true, "highlight"));
    cell.addEventListener("mouseleave", e => updateShipOnMap(e, false, "highlight"));
    cell.addEventListener("dragenter", dragEnter);
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("dragleave", dragLeave);
  })
};

export { drawBoards, getArg, setupPrompt, interact };
