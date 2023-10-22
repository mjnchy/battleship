import { Ship } from "../modules/ship/ship.js";

test("testing if ship is properly created", () => {
  expect(Ship(5)).toEqual({
    length: 5,
    hitCount: 0,
    sunk: false,
  });
});
