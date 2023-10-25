function Ship (name, length) {
  let ship = {name, length, hitCount: 0, sunk: false};
  return {
    hit: function () { return this.isSunk() !== true? ++ship.hitCount: null },
    isSunk: function () { return ship.sunk = ship.hitCount === ship.length? true: false; },
  };
};

export { Ship };
