const domElems = Object.freeze({
  axisSelected: document.querySelector("#axis-selected"),
  axisList: document.querySelector("#axis-drop-down-list"),
  axisOption1: document.querySelector(".axis-drop-down-item"),
  axisOption2: document.querySelector(".axis-drop-down-item:nth-of-type(2)"),
});

function toggleAxisMenu () { 
  domElems.axisList.classList.contains("expanded")? domElems.axisSelected.blur(): null;
  domElems.axisList.classList.toggle("expanded");
};

function externalMenuCollapse (element) {
  if (element != domElems.axisSelected && element != domElems.axisOption1 && element != domElems.axisOption2)
  domElems.axisList.classList.toggle("expanded");
};

function selectAxis (element) {
  const otherOption = element.nextElementSibling? element.nextElementSibling: element.previousElementSibling;
  element.classList.add("current");
  otherOption.classList.remove("current");
  
  domElems.axisSelected.dataset.value = element.dataset.value;
  domElems.axisSelected.textContent = element.textContent;
  domElems.axisList.classList.toggle("expanded");
};

function interact () {
  window.addEventListener("click", e => {
    const target = e.target;
    if (domElems.axisList.classList.contains("expanded")) externalMenuCollapse(target);

    switch (target) {
      case domElems.axisSelected:
        toggleAxisMenu(); 
        break;

      case domElems.axisOption1:
        selectAxis(target);
        break;

      case domElems.axisOption2:
        selectAxis(target);
        break;
    };
  });
};

export { interact };
