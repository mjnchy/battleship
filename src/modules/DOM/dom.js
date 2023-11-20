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

export { drawBoards, setupPrompt };
