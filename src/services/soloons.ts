import { fetchApi } from ".";

export type SoloonColor = "blue" | "red" | "purple" | "white";

export const soloons = {
  post: async function postSoloons(body: { row: number; column: number; color: SoloonColor }) {
    return fetchApi({
      uri: `soloons`,
      method: "POST",
      body,
    });
  },
  delete: async function deleteSoloons(body: { row: number; column: number }) {
    return fetchApi({
      uri: `soloons`,
      method: "DELETE",
      body,
    });
  },
};
