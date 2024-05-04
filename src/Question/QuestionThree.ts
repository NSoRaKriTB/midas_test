// Question 3/4: Snakes and ladders
interface BoardConfiguration {
  ladders: [number, number][];
  snakes: [number, number][];
}

export function quickestPath(board: BoardConfiguration): number[] {
  const graph: Map<number, number[]> = new Map();
  const visited: Set<number> = new Set();
  const queue: [number, number[], number[]][] = [[1, [], []]];

  for (const [start, end] of board.ladders.concat(board.snakes)) {
    if (!graph.has(start)) graph.set(start, []);
    graph.get(start)?.push(end);
  }

  while (queue.length > 0) {
    const [currentPosition, currentPath, currentDiceRolls] = queue.shift()!;
    if (visited.has(currentPosition)) continue;
    visited.add(currentPosition);

    if (currentPosition === 100) {
      return currentDiceRolls;
    }

    for (let i = 1; i <= 6; i++) {
      const nextPosition = currentPosition + i;
      if (graph.has(nextPosition)) {
        for (const next of graph.get(nextPosition)!) {
          queue.push([
            next,
            currentPath.concat(nextPosition),
            currentDiceRolls.concat(i),
          ]);
        }
      } else {
        queue.push([
          nextPosition,
          currentPath.concat(nextPosition),
          currentDiceRolls.concat(i),
        ]);
      }
    }
  }

  return [];
}
