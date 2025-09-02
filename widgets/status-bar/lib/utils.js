export function parseJson(json) {
    try {
      // clean up JSON with escape sequences, (i.e.)
      // empty arrays: [,] -> []
      // escape sequences: \\" -> "
      let cleanedJson = json
        .replace(/\[,+/g, "[")
        .replace(/,+\]/g, "]")
        .replace(/,+,/g, ",")
        .replace(/\[,/g, "[")
        .replace(/,\]/g, "]")
        .replace(/\\/g, "\\\\")
        .replace(/\\"/g, '"');
      return JSON.parse(cleanedJson);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, json);
      return undefined;
    }
  }