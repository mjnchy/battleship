function Ship (length, hitCount = 0, sunk = false) {
  let ship = {length, hitCount, sunk};
  return {
    hit: () => hitCount < length? ++ship.hitCount: null,
    isSunk: () => ship.sunk = ship.hitCount === ship.length? true: false,
  };
};

export { Ship };
