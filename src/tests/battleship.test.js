import { Ship } from "../modules/ship/ship.js";
import { Gameboard } from "../modules/gameboard/gameboard.js";
// import { Player } from "../modules/player/player.js";

let ship = Ship(5);
let gameBoard = Gameboard();
// let player = Player();

test("tests if ship methods are working properly", () => {
  expect(ship.hit()).toBe(1);
  expect(ship.isSunk()).toBe(false);
});

test("tests gameBoard", () => {
  expect(gameBoard.board1).toBeDefined();
  gameBoard.placeShip("board1", 9, 9);
  expect(gameBoard.board1[9][9]).toBe("ship placed")
});
