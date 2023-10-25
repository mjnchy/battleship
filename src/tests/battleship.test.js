import { Ship } from "../modules/ship/ship.js";
import { Gameboard } from "../modules/gameboard/gameboard.js";
// import { Player } from "../modules/player/player.js";

// let player = Player();

test("tests if ship methods are working properly", () => {
  let ship = Ship(5);
  expect(ship.hit()).toBe(1);
  expect(ship.isSunk()).toBe(false);
});

test("tests gameBoard", () => {
  let gameBoard = Gameboard();
  gameBoard.placeShip("carrier", 4, 5);
  expect(gameBoard.board.player.main.grid[4][5].housesShip).toBe(true);
  expect(gameBoard.board.player.main.grid[4][5].ship.hit()).toBe(1);
  expect(gameBoard.board.player.main.grid[4][5].ship.isSunk()).toBe(false);
});
