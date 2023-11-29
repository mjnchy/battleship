const domElems = Object.freeze({
  gameBoardContainer: document.querySelector("#gameboard-container"),
  setupOverlay: document.querySelector("#ship-placement-overlay"),
}), shipParameters = {};

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

function externalMenuCollapse (element) {
  if (!interactables.axisList.classList.contains("expanded")) return;
  if (element != interactables.axisSelected && element != interactables.axisOptions[0] && element != interactables.axisOptions[1])
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

function highlightShip (ev, highlight = true) {
  const selected = document.querySelector(".selected");
  if (!selected) return;
  
  const length = selected.dataset.length, axis = document.querySelector("#axis-selected").dataset.value;
  if (axis != "horizontal" && axis != "vertical")
  console.log(new Error("Invalid axis. Axis can only be horizontal or vertical"));

  const arr = getArr(parseInt(ev.target.dataset.identifier), axis, parseInt(length));
  arr.forEach(subArr => {
    const cell = document.querySelector(`#player-map>.cell[data-identifier="${subArr[0]*10 + subArr[1]}"]`);
    highlight == true? cell.classList.add("highlight"): cell.classList.remove("highlight");
  });
};

function markShip (ev) {
  const selected = document.querySelector(".selected");
  if (!selected) return alert("A ship has to be selected before it can be placed. Please select a ship and try again.");

  const name = selected.dataset.name, length = selected.dataset.length,
  axis = document.querySelector("#axis-selected").dataset.value;
  if (axis != "horizontal" && axis != "vertical") throw new Error("Invalid axis. Axis can only be horizontal or vertical");

  const arr = getArr(parseInt(ev.target.dataset.identifier), axis, parseInt(length));
  arr.forEach(subArr => {
    const cell = document.querySelector(`#player-map>.cell[data-identifier="${subArr[0]*10 + subArr[1]}"]`);
    cell.classList.add("mark");
    cell.dataset.name = selected.dataset.name;
  });

  setShipParams(name, arr, length);
};

function getArr (identifier, axis, length) {
  const x = Math.floor(identifier/10), y = identifier%10, halfLength = Math.floor(length/2), arr = [];

  let start = axis == "vertical"? x - halfLength: y - halfLength;
  if (start < 0) start = 0;
  let end = start + length;
  if (end > 9) end = 10; start = end - length;

  if (axis == "horizontal") for (let i = start; i < end; i++) arr.push([x, i])
  else for (let i = start; i < end; i++) arr.push([i, y])

  return arr;
};

function setShipParams (name, arr, length) {
  shipParameters.name = {name, arr, length};
};

function interact () {
  window.addEventListener("click", e => {
    const target = e.target;
    deselect(target);
    externalMenuCollapse(target);

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

  interactables.playerMap.addEventListener("click", markShip);
  interactables.playerGrid.forEach(cell => {
    cell.addEventListener("mouseenter", highlightShip);
    cell.addEventListener("mouseleave", e => highlightShip(e, false));
  });
};

export { drawBoards, setupPrompt, interact };
