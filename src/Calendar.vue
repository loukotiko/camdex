<script setup lang="ts">
import { ref } from "vue";
import { PokeAPI } from "pokeapi-types";
import { pokeApi, translate } from "./utils.ts";
import { PokemonCamdex } from "./types";
import camdex from "../data/camdex.json";
import pkmnsCustom from "../data/pkmns_custom.json";
import Pkmn from "./Pkmn.vue";

const pkmnsByDate = ref({} as Record<string, PokemonCamdex[]>);

Object.entries(camdex).forEach(async ([date, pokemons]) => {
  pkmnsByDate.value[date] = [];
  Object.entries(pokemons).forEach(async ([key, value]) => {
    const captured = value === "captured";
    const registered = captured ? 3 : +value;

    try {
      const pkmn: PokeAPI.Pokemon = await pokeApi("pokemon/" + key);
      const pkmnSpecies: PokeAPI.PokemonSpecies = await pokeApi(
        pkmn.species.url
      );

      pkmnsByDate.value[date] = [
        ...pkmnsByDate.value[date],
        {
          name: translate(pkmnSpecies.names, "fr"),
          img: pkmn.sprites.front_default,
          types: pkmn.types.map(({ type }) => type.name),
          captured,
          registered,
        },
      ];
    } catch (e) {
      const pkmnCustom = pkmnsCustom[key as keyof typeof pkmnsCustom];
      pkmnsByDate.value[date] = [
        ...pkmnsByDate.value[date],
        {
          name: pkmnCustom.name,
          img: pkmnCustom.img,
          types: pkmnCustom.types,
          captured,
          registered,
        },
      ];
    }
  });
});
const formatter = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

function parseDate(dateStr: string) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day); // Les mois commencent à 0 en JS
}

function readable(string: string) {
  if (string === "before") return "Avant";
  return formatter.format(parseDate(string));
}
</script>

<template>
  <div id="calendar">
    <div v-for="(pokemons, date) in pkmnsByDate" class="date">
      <h1>{{ readable(date) }}</h1>
      <div class="pkmn-list">
        <Pkmn v-for="pkmn in pokemons" :pkmn="pkmn" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pkmn-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-gap: 8px;
  margin-bottom: 1em;
}

h1 {
  font-family: Bebas Neue;
  margin: 0;
  color: white;
}
</style>
