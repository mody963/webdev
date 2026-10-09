<script setup lang="ts">
import { ref } from 'vue'

const message = ref<string>('')

function Reserve() {
  message.value = `Grinder/Scale reserved`
}
</script>

<template>
    <header>
        <h1>The Grinders and the scales</h1>
    </header>
    <button @click="Reserve()" class="button-primary">Reserve Grinder/Scale</button>
    <p>{{ message }}</p>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
</style>