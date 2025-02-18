<script setup lang="ts">
import { computed, ref } from "vue";
import { PokeAPI } from "pokeapi-types";
import { pokeApi, translate, types } from "./utils.ts";
import { PokemonCamdex } from "./types";
import camdex from "../data/camdex.json";
import pkmnsCustom from "../data/pkmns_custom.json";
import Pkmn from "./Pkmn.vue";

const pkmns = ref([] as PokemonCamdex[]);

Object.entries(camdex).forEach(async ([key, value], index) => {
  const captured = value === "captured";
  const registered = captured ? 3 : +value;

  try {
    const pkmn: PokeAPI.Pokemon = await pokeApi("pokemon/" + key);
    const pkmnSpecies: PokeAPI.PokemonSpecies = await pokeApi(pkmn.species.url);

    pkmns.value[index] = {
      name: translate(pkmnSpecies.names, "fr"),
      img: pkmn.sprites.front_default,
      types: pkmn.types.map(({ type }) => type.name),
      captured,
      registered,
    };
  } catch (e) {
    const pkmnCustom = pkmnsCustom[key as keyof typeof pkmnsCustom];
    pkmns.value[index] = {
      name: pkmnCustom.name,
      img: pkmnCustom.img,
      types: pkmnCustom.types,
      captured,
      registered,
    };
  }
});

const filterSelected = ref("all");
const filteredPkmns = computed(() =>
  pkmns.value
    .filter((pkmn) => {
      let authorized = true;
      if (filterSelected.value === "registeredOnly")
        authorized &&= pkmn.registered === 3;
      if (filterSelected.value === "capturedOnly") authorized &&= pkmn.captured;
      if (filterSelected.value !== "all")
        authorized &&= pkmn.types.includes(filterSelected.value);
      return authorized;
    })
    .filter(Boolean)
    .sort((p1, p2) => {
      if (p1.captured && !p2.captured) return -1;
      if (p2.captured && !p1.captured) return 1;
      if (p1.registered > p2.registered) return -1;
      if (p2.registered > p1.registered) return 1;
      if (p1.name.toUpperCase() < p2.name.toUpperCase()) return -1;
      return 1;
    })
);

const pkmnsTotal = computed(() => pkmns.value.length);
const pkmnsTotalCaptured = computed(
  () => pkmns.value.filter((pkmn) => pkmn?.captured).length
);
const pkmnsTotalRegistered = computed(
  () => pkmns.value.filter((pkmn) => pkmn?.registered === 3).length
);

const pkmnsTotalType = computed(() =>
  pkmns.value.filter(Boolean).reduce(
    (total, pkmn) => ({
      ...total,
      ...(pkmn.types || []).reduce(
        (totalType, type) => ({
          ...totalType,
          [type]: (total[type as keyof typeof total] || 0) + 1,
        }),
        {}
      ),
    }),
    {}
  )
);
</script>

<template>
  <div id="pkmn-filters" class="pkmn-filters">
    <label class="pkmn-filter">
      <input type="radio" v-model="filterSelected" value="all" />
      <span>
        <span class="label">Tous</span>
        <span class="number">{{ pkmnsTotal }}</span>
      </span>
    </label>
    <label class="pkmn-filter filter-green">
      <input type="radio" v-model="filterSelected" value="registeredOnly" />
      <span>
        <span class="label">Enregistrés</span>
        <span class="number">{{ pkmnsTotalRegistered }}</span>
      </span>
    </label>
    <label class="pkmn-filter filter-gold">
      <input type="radio" v-model="filterSelected" value="capturedOnly" />
      <span>
        <span class="label">Capturés</span>
        <span class="number">{{ pkmnsTotalCaptured }}</span>
      </span>
    </label>
  </div>
  <div id="pkmn-filters-types" class="pkmn-filters">
    <label class="pkmn-filter filter-small" v-for="(label, key) in types">
      <input type="radio" v-model="filterSelected" :value="key" />
      <span>
        <span class="label">{{ label }}</span>
        <span class="number">{{
          pkmnsTotalType[key as keyof typeof pkmnsTotalType] || 0
        }}</span>
      </span>
    </label>
  </div>
  <div id="pkmn-list">
    <Pkmn v-for="pkmn in filteredPkmns" :pkmn="pkmn" />
  </div>
</template>

<style scoped>
#pkmn-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  grid-gap: 10px;
}
#pkmn-filters {
  text-align: center;
  display: flex;
  :not(:first-child) > span {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  :not(:last-child) > span {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
}

#pkmn-filters-types {
  margin-bottom: 30px;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  .pkmn-filter > span {
    border-radius: 0;
  }
}

.pkmn-filter {
  flex: 1;
  font-family: Bebas Neue;

  input {
    position: absolute;
    left: -999px;
  }

  > span {
    --border-color: rgb(99, 99, 99);
    --color: rgb(207, 207, 207);
    border: 3px solid var(--border-color);
    box-shadow: 4px 4px 0px #00000033, inset 2px 2px 0px white,
      inset -2px -2px 0px #00000033;
    border-radius: 16px 8px;
    background: var(--color);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3px;
    cursor: pointer;
    transition: all 0.2s;
  }
  &.filter-green > span {
    --border-color: rgb(19, 177, 67);
    --color: rgb(175, 216, 187);
  }
  &.filter-gold > span {
    --border-color: rgb(224, 162, 26);
    --color: rgb(240, 219, 175);
  }

  .label {
    font-size: 20px;
    margin: 6px 0 -6px;
  }
  .number {
    font-size: 32px;
    color: var(--border-color);
  }

  &.filter-small {
    .label {
      font-size: 16px;
      margin: 6px 0 -6px;
    }
    .number {
      font-size: 24px;
      color: var(--border-color);
    }
  }

  input:checked + span {
    box-shadow: 4px 4px 0px #00000033, inset -2px -2px 0px white,
      inset 2px 2px 0px #00000033;
  }
}
</style>
