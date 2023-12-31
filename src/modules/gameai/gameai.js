import { getArr, getCor } from "../DOM/dom";

function genRandIdentifier () {
  return Math.floor(Math.random() * 100);
};

function genRandAxis () {
  const axis = [ "horizontal", "vertical" ];
  return axis[Math.round(Math.random())];
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

function getValidAttackParameters (identifier = genRandIdentifier()) {
  return { identifier, cor: getCor(identifier)};
};

function attackPlayer () {
  setTimeout(() => {
    let attackParams = getValidAttackParameters();
    while (player1.isAttacked(...attackParams.cor)) attackParams = getValidAttackParameters();

    const target = document.querySelector(`#player-map>.cell[data-identifier="${attackParams.identifier}"]`);
    let shipHit = player2.attack(player1, ...attackParams.cor);
    updateAttackedCor("computer", target, attackParams.identifier, player1.map.grid[attackParams.cor[0]][attackParams.cor[1]].ship != null);
    
    if (shipHit) {
      if (!player1.allShipsSunk()) return followUpAttack(attackParams, 1500);
      return endGame("lost");
    };
    switchPlayer();
  }, delay);
};

function followUpAttack (player, enemy, prevAtkParams) {
};

function getFollowUpParams (prevAtkParams) {
  let operations = [
    identifier => identifier + 1,
    identifier => identifier -1,
    identifier => identifier + 10,
    identifier => identifier - 10,
  ],
  
  numberOfOperations = 3,
  getRandOperation = () => Math.round(Math.random() * numberOfOperations),
  operation = getRandOperation(),
  newAttackParams = getValidAttackParameters(operations[operation](prevAtkParams.identifier));

  while (enemy.isAttacked(...newAttackParams.cor)) {
    if (!operations.length) return getValidAttackParameters();
    operations.splice(operation, 1);
    numberOfOperations--;  
    operation = getRandOperation();
    newAttackParams = getValidAttackParameters(operations[operation](prevAtkParams.identifier));
  }
};
// console.log(followUpAttack(null, null, { identifier: 42 }));

export { placeShipsOnEnemyBoard, getValidAttackParameters };
