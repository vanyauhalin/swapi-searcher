type ExtractedParameters<P> =
  (P | Record<keyof P, undefined>) & Record<string, string | undefined>;

function extractParameters<P extends Record<string, unknown>>(
  url: string,
  parameters?: string[],
): ExtractedParameters<P> {
  const urlParameters = new URLSearchParams(url);
  const result = Object.fromEntries((parameters || [...urlParameters.keys()])
    .map((parameter) => {
      const value = urlParameters.get(parameter);
      return [parameter, value === null ? undefined : value];
    }));
  return result as ExtractedParameters<P>;
}

export {
  extractParameters,
};
