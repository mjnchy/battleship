function Ship (length, hitCount = 0, sunk = false) {
  let ship = {length, hitCount, sunk};
  return {
    hit: function () { return this.isSunk() != true? ++ship.hitCount: null },
    isSunk: function () { return ship.sunk = ship.hitCount === ship.length? true: false; },
  };
};

export { Ship };
