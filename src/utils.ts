import { PokeAPI } from "pokeapi-types";

export const fetchJson = async (url: string) => await (await fetch(url)).json();

export const pokeApi = async (urlOrEndpoint: string) =>
  await fetchJson(
    urlOrEndpoint.startsWith("http")
      ? urlOrEndpoint
      : `https://pokeapi.co/api/v2/${urlOrEndpoint}`
  );

export const translate = (
  array: PokeAPI.Name[],
  language: PokeAPI.Name["language"]["name"]
) => array.find(({ language: { name } }) => name === language)?.name!;

export const types = {
  normal: "Normal",
  fighting: "Combat",
  flying: "Vol",
  poison: "Poison",
  ground: "Sol",
  rock: "Roche",
  bug: "Insecte",
  ghost: "Spectre",
  steel: "Acier",
  fire: "Feu",
  water: "Eau",
  grass: "Plante",
  electric: "Electrik",
  psychic: "Psy",
  ice: "Glace",
  dragon: "Dragon",
  dark: "Ténèbres",
  fairy: "Fée",
};

export const translateType = (key: string) => types[key as keyof typeof types];
