<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="page-container">
    <!-- Global Navigation Bar -->
    <nav class="nav-bar">
      <ul class="nav-bar">
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/group-orders">Group Orders</RouterLink>
        </li>
        <li>
          <RouterLink to="/tastings">Tastings</RouterLink>
        </li>
        <li>
          <RouterLink to="/the-shelf">The Shelf</RouterLink>
        </li>
        <li>
          <RouterLink to="/TheGrinderAndTheScales">The Shelf</RouterLink>
        </li>
        <li class="right">
          <RouterLink to="/about">About</RouterLink>
        </li>
      </ul>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}
</style>
