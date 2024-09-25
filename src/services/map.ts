import { fetchApi, config } from ".";

export const map = {
  goal: async function goal(test: boolean = false) {
    const response = await fetchApi(
      {
        uri: `map/${config.CANDIDATE_ID}/goal`,
        method: "GET",
      },
      test
    );

    const { goal } = response as { goal: Array<Array<string>> };

    return goal;
  },
  megaverse: async function megaverse(test: boolean = false) {
    const response = await fetchApi(
      {
        uri: `map/${config.CANDIDATE_ID}`,
        method: "GET",
      },
      test
    );

    const {
      map: { content },
    } = response as { map: { content: Array<Array<Record<string, unknown> | null>> } };

    return mappers.megaverse(content);
  },
};

const mappers = {
  megaverse: function (content: Array<Array<Record<string, unknown> | null>>): Array<Array<string>> {
    return content.map((row) =>
      row.map((cell: Record<string, unknown> | null) => {
        if (cell === null) {
          return "SPACE";
        }

        if (cell.type === 0) return "POLYANET";
        if (cell.type === 1) return `${cell.color}_SOLOON`;
        if (cell.type === 2) return `${cell.direction}_COMETH`;

        return "Unidentified Fungible Object";
      })
    );
  },
};
