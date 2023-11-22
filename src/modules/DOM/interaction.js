function toggleAxisMenu (menu, button) { 
  menu.classList.contains("expanded")? button.blur(): null;
  menu.classList.toggle("expanded");
};

function externalMenuCollapse (element, button, option1, option2) {
  if (element != button && element != option1 && element != option2)
  interactElems.axisList.classList.toggle("expanded");
};

function selectAxis (element, button, list) {
  const otherOption = element.nextElementSibling? element.nextElementSibling: element.previousElementSibling;
  element.classList.add("current");
  otherOption.classList.remove("current");
  
  button.dataset.value = element.dataset.value;
  button.textContent = element.textContent;
  list.classList.toggle("expanded");
};

function drawShip (arr) {
  arr.forEach(identifier => 
    document.querySelector(`#player-map>.cell[data-identifier="${identifier}"]`).style.backgroundColor = "red");
};

function getCordinates (identifier) { return [Math.floor(identifier/10), identifier%10] };

function interact () {
  const interactElems = Object.freeze({
    playerMap: document.querySelector("#player-map"),
    axisSelected: document.querySelector("#axis-selected"),
    axisList: document.querySelector("#axis-drop-down-list"),
    axisOption1: document.querySelector(".axis-drop-down-item"),
    axisOption2: document.querySelector(".axis-drop-down-item:nth-of-type(2)"),
  });

  window.addEventListener("click", e => {
    const target = e.target;
    if (interactElems.axisList.classList.contains("expanded")) 
    externalMenuCollapse(target, interactElems.axisSelected, interactElems.axisOption1, interactElems.axisOption2);

    switch (target) {
      case interactElems.axisSelected:
        toggleAxisMenu(interactElems.axisList, interactElems.axisSelected); 
        break;

      case interactElems.axisOption1:
        selectAxis(target, interactElems.axisSelected, interactElems.axisList);
        break;

      case interactElems.axisOption2:
        selectAxis(target, interactElems.axisSelected, interactElems.axisList);
        break;
    };
  });
  
  interactElems.playerMap.addEventListener("click", e => console.log(e.target));

  // return {
  //   placeShip: (cb) => {
  //     document.querySelector("#player-map").addEventListener("click", e => {
  //       const target = e.target, cor = getCordinates(target.dataset.identifier);
  //       drawShip(cb, "carrier", cor, "horizontal");
  //     });
  //
  //   }
  // }
};

export { interact };
