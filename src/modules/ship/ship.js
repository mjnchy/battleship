const shipLength = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 2,
  patrolboat: 1
};

function Ship (name) {
  if (!shipLength[name]) throw new Error("Invalid ship.");
  const ship = {
    name,
    length: shipLength[name],
    hitCount: 0,
    sunk: false,
  };

  return {
    hit: () => ship.hitCount >= ship.length? null: ++ship.hitCount,
    isSunk: () => ship.hitCount == ship.length? ship.sunk = true: false,
  };
};

export { Ship };
