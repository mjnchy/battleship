import { Ship } from "../modules/ship/ship.js";
import { Gameboard } from "../modules/gameboard/gameboard.js";
// import { Player } from "../modules/player/player.js";

// let player = Player();

test("tests if ship methods are working properly", () => {
  expect(() => {Ship("fail")}).toThrow();
  let ship = Ship("carrier");
  expect(ship.hit()).toBe(1);
  expect(ship.isSunk()).toBe(false);
});

test("tests gameboard and its methods", () => {
  let gameBoard = Gameboard();
  let player = gameBoard.board.player;
  let enemy = gameBoard.board.enemy;
  gameBoard.placeShip("carrier", 4, 5);
  expect(player.map.grid[4][5].housesShip).toBe(true);
  expect(gameBoard.receiveAttack(4, 5)).toBe("no ships were hit");
  expect(enemy.map.totalAtks).toBe(1);
  expect(enemy.map.tracker[45]).toBe(true);
  expect(enemy.map.atkCors.includes(45)).toBe(true);
  expect(gameBoard.receiveAttack(4, 5)).toBe("cannot attack the cordinate twice");
})
