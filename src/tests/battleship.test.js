import { Ship } from "../modules/ship/ship.js";
import { Gameboard } from "../modules/gameboard/gameboard.js";
import { Player } from "../modules/player/player.js";

let player1 = Player("player1"), player2 = Player("player2");

test("tests if ship methods are working properly", () => {
  expect(() => {Ship("fail")}).toThrow();
  let ship = Ship("carrier");
  expect(ship.hit()).toBe(1);
  expect(ship.isSunk()).toBe(false);
});

test("tests gameboard and its methods", () => {
  let gameBoard = Gameboard("player");
  gameBoard.placeShip("carrier", 4, 5);
  gameBoard.receiveAttack(4, 5);
  expect(gameBoard.map.grid[4][5].ship).toBeTruthy();
  expect(gameBoard.map.totalAtks).toBe(1);
  expect(gameBoard.map.attacked[45]).toBe(true);
});

test("tests the player function", () => {
  player1.attack(player2, 4, 5);
  expect(player2.map.attacked[player2.map.grid[4][5].identifier]).toBe(true);
});
