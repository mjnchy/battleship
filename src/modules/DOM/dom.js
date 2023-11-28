const domElems = Object.freeze({
  gameBoardContainer: document.querySelector("#gameboard-container"),
  setupOverlay: document.querySelector("#ship-placement-overlay"),
});

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
  });
};

function setupPrompt () {
  domElems.setupOverlay.classList.toggle("visible");
};

function getArg (e) {
  const identifier = e.target.dataset.identifier, x = Math.floor(identifier/10), y = identifier%10,
  data = document.querySelector(".temp-ship-img.selected"), name = data.name, length = data.length,
  arr = [], halfLength = Math.floor(length/2),
  orientation = document.querySelector("#axis-selected").dataset.value;

  let start = orientation == "vertical"? x - halfLength: y - halfLength;
  start < 0? start = 0: null;
  let end = start + length; 
  if (end > 9) { end = 10; start = end - length; };

  for (let i = start; i < end; i++) arr.push(orientation == "vertical"? [i, y]: [x, i])
  return {name, arr, length};
};

export { drawBoards, getArg, setupPrompt };
