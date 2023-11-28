import "./modules/styles/styles.js";
import { Player } from "./modules/player/player.js";
import { drawBoards, setupPrompt } from "./modules/DOM/dom.js";
import { interact } from "./modules/DOM/interaction.js";

window.onload = () => {
  const player1 = Player("player1");
  const player2 = Player("player2");
   
  drawBoards([[player1.map.grid, "player-map"], [player1.enemyMap.grid, "enemy-map"]]);
  setupPrompt();
  interact();
};
