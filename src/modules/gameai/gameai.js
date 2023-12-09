import { getArr } from "../DOM/dom";

const ships = [ "carrier", "battleship", "destroyer", "submarine", "patrolboat"];

function genRandIdentifier () {
  return Math.floor(Math.random() * 100);
};

function genRandAxis () {
  const axis = [ "horizontal", "vertical" ];
  return axis[Math.floor(Math.random() * 2)];
};

function placeShipsOnEnemyBoard (map, cb) {
  let initialLength = 0, maxLength = 5;

  while(initialLength < maxLength) {
    let ship = ships[initialLength], length = (maxLength - initialLength), axis = genRandAxis(), arr = getArr(genRandIdentifier(), axis, length), corHasShip = arr.some(cor => map[cor[0]][cor[1]].ship);

    if (corHasShip == false) {
      console.log(ship, arr, length);
      cb({ ship, arr, length });
      initialLength++;
    };
  }
};

export { placeShipsOnEnemyBoard };
