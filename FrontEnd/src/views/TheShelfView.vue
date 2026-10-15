<script setup lang="ts">
import { useCoffeeBag } from '../composables/useCoffeeBags'

const { coffeeBags } = useCoffeeBag()
</script>

<template>
  <div class="page-container">
    <nav class="nav-bar">
      <ul class="nav-bar">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/group-orders">Grouporders</RouterLink></li>
        <li><RouterLink to="/tastings">Tastings</RouterLink></li>
      </ul>
    </nav>

    <header>
      <h1>The Shelf</h1>
      <hr>
    </header>

    <main>
      <section>
        <h2>Your coffee</h2>

        <p v-if="coffeeBags.length === 0">No coffee bags found.</p>

        <article v-for="bag in coffeeBags" :key="bag.id" class="card">
          <table class="data-table">
            <tbody>
              <tr><th>Bag holder</th><td>{{ bag.owner }}</td></tr>
              <tr><th>Bean</th><td>{{ bag.bean }}</td></tr>
              <tr><th>Roaster</th><td>{{ bag.roaster }}</td></tr>
              <tr><th>Grams</th><td>{{ bag.grams }}</td></tr>
              <tr><th>Day of arrival</th><td>{{ bag.dayOfArival }}</td></tr>
              <tr><th>Bag freshness</th><td>{{ bag.bagFreshness }}</td></tr>
              <tr><th>Finished</th><td>{{ bag.finished ? 'Yes' : 'No' }}</td></tr>
            </tbody>
          </table>

          <RouterLink
            class="button-primary"
            :to="{ name: 'ViewBrewNotes', params: { bagId: bag.id } }"
          >
            View brew notes
          </RouterLink>

          <RouterLink
            class="button-primary"
            style="background-color: transparent; border: 1px solid var(--color-surface-light); color: var(--color-surface-light);"
            :to="{ name: 'write-brewnote', params: { bagId: bag.id } }"
          >
            Write a brew note
          </RouterLink>
        </article>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

header {
  padding: var(--space-lg) 0;
}

main section {
  margin-bottom: var(--space-lg);
}
</style>