const interactElems = Object.freeze({
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
};

export { interact };
