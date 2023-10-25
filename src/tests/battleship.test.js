import { Ship } from "../modules/ship/ship.js";
import { Gameboard } from "../modules/gameboard/gameboard.js";
// import { Player } from "../modules/player/player.js";

// let player = Player();

test("tests if ship methods are working properly", () => {
  let ship = Ship(5);
  expect(ship.hit()).toBe(1);
  expect(ship.isSunk()).toBe(false);
});

test("tests gameboard and its methods", () => {
  let gameBoard = Gameboard();
  let player = gameBoard.board.player;
  let enemy = gameBoard.board.enemy;
  gameBoard.placeShip("carrier", 4, 5);
  expect(player.map.grid[4][5].housesShip).toBe(true);
  gameBoard.receiveAttack(4, 5);
  expect(enemy.map.totalAtks).toBe(1);
  expect(enemy.map.tracker.includes(45)).toBe(true);
  expect(gameBoard.receiveAttack(4, 5)).toBe("cannot attack the cordinate twice");
})
