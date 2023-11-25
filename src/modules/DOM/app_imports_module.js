function highlightShipLocation (arr) {
  arr.forEach(identifier => document.querySelector(`#player-map>.cell[data-identifier="${identifier}"]`).classList.add("highlight"))
};

function getParams (e) {
  const selected = document.querySelector(".selected");
  const identifier = e.target.dataset.identifier;
  const axis = document.querySelector("#axis-button").dataset.value;
  if (!selected) return alert("A ship must be selected before it can be placed. Please select a ship.");
  return [ selected.dataset.name, Math.floor(identifier/10), identifier%10, axis ];
};
