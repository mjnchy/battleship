import { Ship } from "../modules/ship/ship.js";
import { Gameboard } from "../modules/gameboard/gameboard.js";
import { Player } from "../modules/player/player.js";

let player = Player();

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
  expect(gameBoard.map.tracker[45]).toBe(true);
});

test("tests the player function", () => {
  player.attack(4, 5);
  expect(player.player2.map.totalAtks).toBe(1);
  player.attack(4, 5);
  expect(player.player1.map.totalAtks).toBe(1);
  expect(player.attack(4, 5)).toBe("Cannot attack the same cordinates twice.");
});
