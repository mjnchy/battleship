const shipLength = Object.freeze({
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 2,
  patrolboat: 1
});

function Ship (name, length = shipLength) {
  if (!length[name]) throw new Error("Invalid ship.");
  let ship = {
    name,
    length: length[name],
    hitCount: 0,
    sunk: false,
  };

  return {
    hit: () => ship.hitCount < ship.length? ++ship.hitCount: null,
    isSunk: () => ship.hitCount == ship.length? ship.sunk = true: false,
  };
};

export { Ship };
