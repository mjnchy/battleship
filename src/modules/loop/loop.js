const results = {
  win: ["Congratulations!", "You Won!"],
  lost: ["A Valiant Effort!", "You were bested..."],
};

function endGame (result) {
  const container = document.querySelector("#gameboard-container"),resultBoard = {
    container: document.querySelector("#game-result-container"),
    header: document.querySelector("#result-header"),
    message: document.querySelector("#result-message"),
  };

  container.classList.add("disabled");

  resultBoard.header.textContent = `${results[result][0]}`;
  resultBoard.message.textContent = `${results[result][1]}`;
  resultBoard.container.classList.add("visible"); 
};

export { endGame };
