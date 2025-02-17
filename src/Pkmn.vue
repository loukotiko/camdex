<script setup lang="ts">
import { PokemonCamdex } from "./types";
defineProps<{
  pkmn: PokemonCamdex;
}>();
</script>

<template>
  <div
    :class="{
      pkmn: true,
      'pkmn-captured': pkmn.captured,
      'pkmn-registered': pkmn.registered === 3,
    }"
  >
    <div class="pkmn-name">
      {{ pkmn.name }}
    </div>
    <div class="pkmn-img">
      <img :src="pkmn.img" />
    </div>
    <div class="pkmn-rank">
      <i class="fa-solid fa-circle-dot" v-if="pkmn.captured"></i>
      <i class="fa-solid fa-battery-full" v-else-if="pkmn.registered === 3"></i>
      <i class="fa-solid fa-battery-half" v-else-if="pkmn.registered === 2"></i>
      <i
        class="fa-solid fa-battery-quarter"
        v-for=" in pkmn.registered"
        v-else
      ></i>
    </div>
  </div>
</template>

<style scoped>
.pkmn {
  --border-color: rgb(99, 99, 99);
  --color: rgb(207, 207, 207);
  border: 6px solid var(--border-color);
  box-shadow: 5px 5px 0px #00000033, inset 3px 3px 0px white,
    inset -3px -3px 0px #00000033;
  border-radius: 16px 8px;
  background: var(--color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px;
}
.pkmn-registered {
  --border-color: rgb(19, 177, 67);
  --color: rgb(175, 216, 187);
}
.pkmn-captured {
  --border-color: rgb(224, 162, 26);
  --color: rgb(240, 219, 175);
}
.pkmn-img {
  margin: -16px 0;
  img {
    height: 100px;
    image-rendering: auto;
  }
}
.pkmn-name {
  background: linear-gradient(0deg, transparent 0%, var(--color) 30%);
  font-family: Bebas Neue;
  font-size: 20px;
  padding: 3px;
  align-self: stretch;
  text-align: center;
  border-radius: 8px 0;
  z-index: 1;
}
.pkmn-rank {
  background: linear-gradient(180deg, transparent 0%, var(--color) 30%);
  font-size: 24px;
  padding: 8px;
  align-self: stretch;
  display: flex;
  grid-gap: 6px;
  justify-content: center;
  border-radius: 8px 0;
  z-index: 1;
  color: var(--border-color);

  .fa-circle-dot {
    position: relative;
    &::after {
      content: "";
      border-bottom: 2px solid var(--color);
      width: 100%;
      height: 0;
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 0;
      rotate: -10deg;
      translate: 0 -50%;
    }
  }
}
</style>
