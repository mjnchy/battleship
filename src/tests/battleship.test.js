// import { Ship } from "../modules/ship/ship.js";
// import { Gameboard } from "../modules/gameboard/gameboard.js";
import { Player } from "../modules/player/player.js";

const player1 = Player("player1"), player2 = Player("player2");

// test("tests if ship methods are working properly", () => {
//   expect(() => {Ship("fail")}).toThrow();
//   let ship = Ship("carrier");
//   expect(ship.hit()).toBe(1);
//   expect(ship.isSunk()).toBe(false);
// });

// test("tests gameboard and its methods", () => {
//   let gameBoard = Gameboard();
//   gameBoard.placeShip("carrier", 4, 5);
//   gameBoard.receiveAttack(4, 5);
//   expect(gameBoard.map.grid[4][5].ship).toBeTruthy();
//   expect(gameBoard.map.totalAtks).toBe(1);
//   expect(gameBoard.map.attacked[45]).toBe(true);
//   expect(gameBoard.allShipsSunk()).toBeFalsy();
// });

test("tests the player function", () => {
  player1.placeShip("carrier", 4, 5);
  expect(player1.map.grid[2][5].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });

  expect(player1.map.grid[3][5].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });
  
  expect(player1.map.grid[4][5].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });
  
  expect(player1.map.grid[5][5].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });
  
  expect(player1.map.grid[6][5].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });
  
  expect(player1.map.grid[7][5].ship).toBeFalsy();
  
  player2.placeShip("carrier", 4, 5);
 
  player1.attack(player2, 2, 5);
  player1.attack(player2, 3, 5);
  player1.attack(player2, 4, 5);
  expect(player1.attack(player2, 4, 5)).toBe("Cannot attack the same cordinates twice");
  player1.attack(player2, 5, 5);
  player1.attack(player2, 6, 5);

  expect(player2.map.grid[2][5].ship.isSunk()).toBe(true);
  expect(player2.map.totalAtks).toBe(5);
  expect(player2.map.grid[4][5].ship).toBeTruthy();
  expect(player2.map.attacked[45]).toBe(true);
  // expect(player2.allShipsSunk()).toBe(false);
});
