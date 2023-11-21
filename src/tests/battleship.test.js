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
  player1.placeShip("battleship", 9, 9);
  expect(player1.map.grid[9][9].ship).toMatchObject({
    name: "battleship",
    length: 4,
  });

  expect(player1.map.grid[9][8].ship).toMatchObject({
    name: "battleship",
    length: 4,
  });

  expect(player1.map.grid[9][7].ship).toMatchObject({
    name: "battleship",
    length: 4,
  });

  expect(player1.map.grid[9][6].ship).toMatchObject({
    name: "battleship",
    length: 4,
  });

  expect(player1.map.grid[9][5].ship).toBeFalsy();


  player1.placeShip("carrier", 5, 5);
  expect(player1.map.grid[5][2].ship).toBeFalsy();

  expect(player1.map.grid[5][3].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });
  
  expect(player1.map.grid[5][4].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });
  
  expect(player1.map.grid[5][5].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });
  
  expect(player1.map.grid[5][6].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });

  expect(player1.map.grid[5][7].ship).toMatchObject({
    name: "carrier",
    length: 5,
  });
  
  expect(player1.map.grid[7][5].ship).toBeFalsy();
  
  player2.placeShip("carrier", 5, 5);
 
  player1.attack(player2, 5, 3);
  player1.attack(player2, 5, 4);
  player1.attack(player2, 5, 5);
  expect(player1.attack(player2, 5, 5)).toBe("Cannot attack the same cordinates twice");
  player1.attack(player2, 5, 6);
  player1.attack(player2, 5, 7);

  expect(player2.map.grid[5][3].ship.isSunk()).toBe(true);
  expect(player2.map.totalAtks).toBe(5);
  expect(player2.map.grid[5][4].ship).toBeTruthy();
  expect(player2.map.attacked[54]).toBe(true);
  // expect(player2.allShipsSunk()).toBe(false);
});
