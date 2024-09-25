import { fetchApi } from ".";

export const polyanets = {
  post: async function postPolyanets(body: { row: number; column: number }) {
    return fetchApi({
      uri: `polyanets`,
      method: "POST",
      body,
    });
  },
  delete: async function deletePolyanets(body: { row: number; column: number }) {
    return fetchApi({
      uri: `polyanets`,
      method: "DELETE",
      body,
    });
  },
};
