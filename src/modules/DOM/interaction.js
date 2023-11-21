const interactElems = Object.freeze({
  playerMap: document.querySelector("#player-map"),
  axisSelected: document.querySelector("#axis-selected"),
  axisList: document.querySelector("#axis-drop-down-list"),
  axisOption1: document.querySelector(".axis-drop-down-item"),
  axisOption2: document.querySelector(".axis-drop-down-item:nth-of-type(2)"),
});

function toggleAxisMenu () { 
  interactElems.axisList.classList.contains("expanded")? interactElems.axisSelected.blur(): null;
  interactElems.axisList.classList.toggle("expanded");
};

function externalMenuCollapse (element) {
  if (element != interactElems.axisSelected && element != interactElems.axisOption1 && element != interactElems.axisOption2)
  interactElems.axisList.classList.toggle("expanded");
};

function selectAxis (element) {
  const otherOption = element.nextElementSibling? element.nextElementSibling: element.previousElementSibling;
  element.classList.add("current");
  otherOption.classList.remove("current");
  
  interactElems.axisSelected.dataset.value = element.dataset.value;
  interactElems.axisSelected.textContent = element.textContent;
  interactElems.axisList.classList.toggle("expanded");
};

function drawShips (identifier, length = 5) {
  const half = Math.floor(length/2);
  for (let i = parseInt(identifier) - half; i <= parseInt(identifier) + half; i++) {
    document.querySelector(`#player-map > .cell[data-identifier="${i}"]`).style.backgroundColor = "red";
  }
};

function interact () {
  window.addEventListener("click", e => {
    const target = e.target;
    if (interactElems.axisList.classList.contains("expanded")) externalMenuCollapse(target);

    switch (target) {
      case interactElems.axisSelected:
        toggleAxisMenu(); 
        break;

      case interactElems.axisOption1:
        selectAxis(target);
        break;

      case interactElems.axisOption2:
        selectAxis(target);
        break;
    };
  });

  document.querySelector("#player-map").addEventListener("click", e => {
    drawShips(e.target.dataset.identifier);
  })
};

export { interact };
