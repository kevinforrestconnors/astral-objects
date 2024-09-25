import { fetchApi } from ".";

export type ComethDirection = "up" | "down" | "left" | "right";

export const comeths = {
  post: async function postComeths(body: { row: number; column: number; direction: ComethDirection }) {
    return fetchApi({
      uri: `comeths`,
      method: "POST",
      body,
    });
  },
  delete: async function deleteComeths(body: { row: number; column: number }) {
    return fetchApi({
      uri: `comeths`,
      method: "DELETE",
      body,
    });
  },
};
