<script setup lang="ts">
import { PokemonCamdex } from "./types";
import { translateType } from "./utils";

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
    <div class="pkmn-top">
      <div class="pkmn-name">
        {{ pkmn.name }}
      </div>
      <div class="pkmn-type">
        {{ pkmn.types.map(translateType).join(", ") }}
      </div>
    </div>
    <div class="pkmn-img">
      <img :src="pkmn.img" />
    </div>
    <div class="pkmn-bottom">
      <div class="pkmn-rank">
        <i class="fa-solid fa-circle-dot" v-if="pkmn.captured"></i>
        <i
          class="fa-solid fa-battery-full"
          v-else-if="pkmn.registered === 3"
        ></i>
        <i
          class="fa-solid fa-battery-half"
          v-else-if="pkmn.registered === 2"
        ></i>
        <i
          class="fa-solid fa-battery-quarter"
          v-for=" in pkmn.registered"
          v-else
        ></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pkmn {
  --border-color: rgb(99, 99, 99);
  --color: rgb(207, 207, 207);
  border: 4px solid var(--border-color);
  box-shadow: 3px 3px 0px #00000033, inset 1.5px 1.5px 0px white,
    inset -1.5px -1.5px 0px #00000033;
  border-radius: 10px 6px;
  background: var(--color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
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
    height: 80px;
    image-rendering: auto;
  }
}
.pkmn-top {
  background: linear-gradient(0deg, transparent 0%, var(--color) 30%);
  border-radius: 8px 0;
  z-index: 1;
  align-self: stretch;
  text-align: center;
  padding: 2px 0 6px;
}
.pkmn-name {
  font-family: Bebas Neue;
  font-size: 18px;
}
.pkmn-type {
  font-family: Funnel Sans;
  font-size: 11px;
  line-height: 6px;
}
.pkmn-rank {
  background: linear-gradient(180deg, transparent 0%, var(--color) 30%);
  font-size: 18px;
  padding: 4px;
  align-self: stretch;
  display: flex;
  grid-gap: 6px;
  justify-content: center;
  border-radius: 6px 0;
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
