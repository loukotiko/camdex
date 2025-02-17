<script setup lang="ts">
import { ref } from "vue";
import { pokeApi } from "./utils.ts";

const count = ref(0);
const pkmns = ref([]);

pokeApi("pokemon?limit=999999").then((result) => {
  count.value = result.count;
  pkmns.value = result.results;
});
</script>

<template>
  <h1>{{ count }}</h1>
  <div v-for="pkmn in pkmns">
    {{ pkmn.name }}
  </div>
</template>

<style scoped></style>
