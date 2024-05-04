type Point = {
  location: number;
  energy: number;
};

export function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  const points = Array.from(
    new Set([start, ...shops, ...stations, target])
  ).sort((a, b) => a - b);
  const adj: Map<number, Point[]> = new Map();
  points.forEach((point) => adj.set(point, []));

  for (let i = 0; i < points.length - 1; i++) {
    const distance = points[i + 1] - points[i];
    adj.get(points[i])!.push({ location: points[i + 1], energy: distance });
    adj.get(points[i + 1])!.push({ location: points[i], energy: distance });
  }

  stations.forEach((station1) => {
    stations.forEach((station2) => {
      if (station1 !== station2) {
        adj.get(station1)!.push({ location: station2, energy: 0 });
      }
    });
  });

  function dijkstra(startNode: number): Map<number, number> {
    const minEnergy = new Map<number, number>();
    points.forEach((point) => minEnergy.set(point, Infinity));
    minEnergy.set(startNode, 0);
    const pq: Point[] = [{ location: startNode, energy: 0 }];

    while (pq.length > 0) {
      pq.sort((a, b) => a.energy - b.energy);
      const { location, energy } = pq.shift()!;

      adj
        .get(location)!
        .forEach(({ location: nextLocation, energy: nextEnergy }) => {
          const newEnergy = energy + nextEnergy;
          if (newEnergy < minEnergy.get(nextLocation)!) {
            minEnergy.set(nextLocation, newEnergy);
            pq.push({ location: nextLocation, energy: newEnergy });
          }
        });
    }

    return minEnergy;
  }

  const allShortestPaths = new Map<number, Map<number, number>>();
  points.forEach((point) => {
    allShortestPaths.set(point, dijkstra(point));
  });

  function calculateMinEnergy(
    current: number,
    remainingShops: number[],
    energyUsed: number
  ): number {
    if (remainingShops.length === 0) {
      return energyUsed + allShortestPaths.get(current)!.get(target)!;
    }

    let minEnergy = Infinity;
    for (let i = 0; i < remainingShops.length; i++) {
      const nextShop = remainingShops[i];
      const nextEnergy = allShortestPaths.get(current)!.get(nextShop)!;
      const newRemainingShops = remainingShops.filter(
        (_, index) => index !== i
      );
      const totalEnergy = calculateMinEnergy(
        nextShop,
        newRemainingShops,
        energyUsed + nextEnergy
      );
      minEnergy = Math.min(minEnergy, totalEnergy);
    }

    return minEnergy;
  }

  return calculateMinEnergy(start, shops, 0);
}


