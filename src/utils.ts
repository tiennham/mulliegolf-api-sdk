export const tryParseJson = (jsonString: string): unknown => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return jsonString;
  }
};
