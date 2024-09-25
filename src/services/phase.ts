import { sleep } from "bun";
import { endpoints } from "../services";
import { ComethDirection } from "./comeths";

export async function setMegaverseToGoal(): Promise<unknown[]> {
  const promises: Promise<unknown>[] = [];
  const map = await endpoints.map.megaverse();
  const goal = await endpoints.map.goal();

  console.log(map, goal);

  for (let row = 0; row < goal.length; row++) {
    for (let column = 0; column < goal[row].length; column++) {
      const current = map[row][column];
      const target = goal[row][column];

      if (current !== target) {
        // we do not need to send a lot of requests if the map is already the same as the goal
        if (target === "POLYANET") {
          promises.push(endpoints.polyanets.post({ row, column }));
        } else if (target === "SPACE") {
          promises.push(endpoints.polyanets.delete({ row, column }));
        } else if (target.endsWith("COMETH")) {
          const direction = target.slice(0, target.indexOf("_")).toLowerCase() as ComethDirection;
          promises.push(endpoints.comeths.post({ row, column, direction }));
        } else if (target.endsWith("SOLOON")) {
          const color = target.slice(0, target.indexOf("_")).toLowerCase() as "blue" | "red" | "purple" | "white";
          promises.push(endpoints.soloons.post({ row, column, color }));
        }
      }
    }
  }

  return Promise.all(promises);
}
