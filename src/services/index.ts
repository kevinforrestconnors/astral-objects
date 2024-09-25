import { map } from "./map";
import { comeths } from "./comeths";
import { polyanets } from "./polyanets";
import { soloons } from "./soloons";

export function fetchApi(request: { uri: string; body?: Record<string, unknown>; method: "GET" | "POST" | "PUT" | "DELETE" }, test: boolean = false): Promise<unknown> {
  const testUrl = test ? "http://localhost:8080" : "";
  return fetchWithRetry(
    `${testUrl}/api/${request.uri}`,
    {
      headers: {
        "Content-Type": "application/json;",
      },
      method: request.method,
      body: request.body ? JSON.stringify({ candidateId: config.CANDIDATE_ID, ...request.body }) : undefined,
    },
    20,
    Math.random() * 3000 + 1000
  );
}

function fetchWithRetry(url: string | URL | Request, options: RequestInit | undefined, retries: number, delayTime: number) {
  return fetch(url, options)
    .then(async function (response) {
      const result = await response.json();

      if (result.reason && result.reason === "Too Many Requests. Try again later.") {
        return delay(delayTime).then(function () {
          console.log("retrying", url, "after", delayTime, "ms", retries, "retries left");
          return fetchWithRetry(url, options, retries - 1, delayTime * (Math.random() * 0.5 + 1.25)); // randomness to get the requests spaced out
        });
      }

      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }

      return result;
    })
    .catch(function (error) {
      if (retries === 0) {
        throw error;
      }
      console.log("Not retrying, due to unexpected error: " + error.message);
    });
}

function delay(ms: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

export const config = {
  CANDIDATE_ID: "140c6bab-ddd8-406f-a982-c5573c25e301",
};

export const endpoints = {
  map,
  polyanets,
  soloons,
  comeths,
};
