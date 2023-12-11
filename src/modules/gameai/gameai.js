import { getArr, getCor } from "../DOM/dom";

const attackedIdentifiers = [];

function genRandIdentifier () {
  return Math.floor(Math.random() * 100);
};

function genRandAxis () {
  const axis = [ "horizontal", "vertical" ];
  return axis[Math.floor(Math.random() * 2)];
};

function checkCorForShip (map, arr) {
  return arr.some(cor => map[cor[0]][cor[1]].ship)
};

function placeShipsOnEnemyBoard (map, cb) {
  const ships = [ "carrier", "battleship", "destroyer", "submarine", "patrolboat"];
  let initialLength = 0, maxLength = 5;

  while(initialLength < maxLength) {
    let ship = ships[initialLength], length = (maxLength - initialLength), axis = genRandAxis(), arr = getArr(genRandIdentifier(), axis, length), corHasShip = checkCorForShip(map, arr);

    while(corHasShip == true) {
      arr = getArr(genRandIdentifier(), axis, length);
      corHasShip = checkCorForShip(map, arr);
    };

    cb({ ship, arr, length });
    initialLength++;
  }
};

function getValidAttackCor () {
  const identifier = genRandIdentifier();
  while (attackedIdentifiers.includes(identifier)) identifier = genRandIdentifier();

  return getCor(identifier);
};

export { placeShipsOnEnemyBoard, getValidAttackCor };
