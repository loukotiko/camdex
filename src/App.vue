<script setup lang="ts">
import Dex from "./Dex.vue";
import Calendar from "./Calendar.vue";
import { ref } from "vue";

const page = ref("dex");

function switchPage() {
  page.value = page.value === "dex" ? "cal" : "dex";
}
</script>

<template>
  <button @click="switchPage()" title="Switch page" id="switch-page">
    <i
      class="fa-solid"
      :class="{ 'fa-calendar': page === 'dex', 'fa-list': page === 'cal' }"
    ></i>
  </button>
  <Dex v-if="page === 'dex'" />
  <Calendar v-if="page === 'cal'" />
</template>

<style scoped>
#switch-page {
  --border-color: rgb(99, 99, 99);
  --color: rgb(207, 207, 207);
  border: 2px solid var(--border-color);
  box-shadow: 3px 3px 0px #00000033, inset 1.5px 1.5px 0px white,
    inset -1.5px -1.5px 0px #00000033;
  border-radius: 14px 6px;
  background: var(--color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  float: right;
}
</style>
