export const fetchJson = async (url: string) => await (await fetch(url)).json();

export const pokeApi = async (urlOrEndpoint: string) =>
  await fetchJson(
    urlOrEndpoint.startsWith("http")
      ? urlOrEndpoint
      : `https://pokeapi.co/api/v2/${urlOrEndpoint}`
  );
