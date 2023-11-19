const domElems = Object.freeze({
  axisSelected: document.querySelector("#axis-selected"),
  axisList: document.querySelector("#axis-drop-down-list"),
  axisOption1: document.querySelector(".axis-drop-down-item"),
  axisOption2: document.querySelector(".axis-drop-down-item:nth-of-type(2)"),
});

function toggleAxisList () { 
  if (document.activeElement == domElems.axisSelected && domElems.axisList.dataset.expanded == "true") domElems.axisSelected.blur();
  domElems.axisList.dataset.expanded = domElems.axisList.dataset.expanded == "true"? false: "true";

  // axisOptions.forEach(option => {
  //   option.addEventListener("click", e => {
  //     e.target.classList.add('current');
  //     const otherOption = e.target.nextElementSibling? e.target.nextElementSibling: e.target.previousElementSibling;
  //     otherOption.classList.remove("current");
  //     axisSelected.dataset.value = e.target.dataset.value;
  //     axisSelected.textContent = e.target.textContent;
  //     axisList.dataset.expanded = false;
  //   })
  // });
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

    if (document.activeElement == domElems.axisSelected && target != domElems.axisSelected || domElems.axisOption1 || domElems.axisOption2) {
      console.log('okay');
    };
  });
};

export { interact };
