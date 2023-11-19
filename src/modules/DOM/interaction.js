const domElems = Object.freeze({
  axisSelected: document.querySelector("#axis-selected"),
  axisList: document.querySelector("#axis-drop-down-list"),
  axisOption1: document.querySelector(".axis-drop-down-item"),
  axisOption2: document.querySelector(".axis-drop-down-item:nth-of-type(2)"),
});

function toggleAxisList () { 
  domElems.axisList.dataset.expanded == "true"? domElems.axisSelected.blur(): null;
  domElems.axisList.dataset.expanded = domElems.axisList.dataset.expanded == "true"? "false": "true";
};

function selectShipAxis (element) {
  const otherOption = element.nextElementSibling? element.nextElementSibling: element.previousElementSibling;
  element.classList.add("current");
  otherOption.classList.remove("current");
  
  domElems.axisSelected.dataset.value = element.dataset.value;
  domElems.axisSelected.textContent = element.textContent;
  domElems.axisList.dataset.expanded = false;
};

function interact () {
  window.addEventListener("click", e => {
    const target = e.target;

    // if (domElems.axisList.dataset.expanded == "true") {
    //   if (target == domElems.axisOption1 || target == domElems.axisOption2) null
    //   else domElems.axisList.dataset.expanded = "false";
    // }

    switch (target) {
      case domElems.axisSelected:
        toggleAxisList(); 
        break;

      case domElems.axisOption1:
        selectShipAxis(target);
        break;

      case domElems.axisOption2:
        selectShipAxis(target);
        break;
    };
  });
};

export { interact };
