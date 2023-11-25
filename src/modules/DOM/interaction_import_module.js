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

function selectShip (e) {
  document.querySelectorAll(".temp-ship-img.selected").forEach(selected => selected.classList.remove("selected"));
  this.classList.add("selected");
};

function deselect (target, exceptions) {
  const exceptionMatched = exceptions.some(exception => exception == target), 
  selected = document.querySelector(".temp-ship-img.selected");
  if (exceptionMatched == true) return;
  selected? selected.classList.remove("selected"): null;
};

export { toggleAxisMenu, externalMenuCollapse, selectAxis, selectShip, deselect }
