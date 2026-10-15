<script setup lang="ts">
import { useCoffeeBag } from '../composables/useCoffeeBags'

const { coffeeBags } = useCoffeeBag()
</script>

<template>
    <div class="page-container">
    <nav class = "nav-bar">
    <ul class = "nav-bar">
    <!-- <p><a href="../index.html" class = "back-link">&larr; Back to Main Menu</a></p>-->
    <li><RouterLink to="/">Home</RouterLink></li>
    <li><RouterLink to="/group-orders">Grouporders</RouterLink></li>
    <li><RouterLink to="/tastings">tastings</RouterLink></li>
    <li><RouterLink to="/the-shelf">The Shelf</RouterLink></li>
    <li class="right"><a href="about.asp">About</a></li>
    </ul>
    </nav>
    <header>
    <h1>My Coffee bags</h1>
    <hr />
    </header>

    <main>
  <section>
    <h2>Bags</h2>

    <article
      v-for="bag in coffeeBags"
      :key="bag.id"
      class="card"
    >
      <table class="data-table">
        <tbody>
          <tr>
            <th>Bag holder</th>
            <td>{{ bag.owner }}</td>
          </tr>
          <tr>
            <th>Bean</th>
            <td>{{ bag.bean }}</td>
          </tr>
          <tr>
            <th>Roaster</th>
            <td>{{ bag.roaster }}</td>
          </tr>
          <tr>
            <th>Grams</th>
            <td>{{ bag.grams }}</td>
          </tr>
          <tr>
            <th>Day of arrival</th>
            <td>{{ bag.dayOfArival }}</td>
          </tr>
          <tr>
            <th>Bag freshness</th>
            <td>{{ bag.bagFreshness }}</td>
          </tr>
          <tr>
            <th>Finished</th>
            <td>{{ bag.finished ? 'Yes' : 'No' }}</td>
          </tr>
        </tbody>
      </table>

    
    <RouterLink
        type="button" 
        class="button-primary"
    :to="{ name: 'ViewBrewNotes', params: { bagId: bag.id } }">
    View brew notes
    </RouterLink>
    
    <RouterLink
    type="button" 
    class="button-primary"
    style="background-color: transparent; border: 1px solid var(--color-surface-light); color: var(--color-surface-light);"
        :to="{ name: 'write-brewnote', params: { bagId: bag.id } }">
        Write a brew note
    </RouterLink>
    </article>
  </section>
</main>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}
header {
    padding: var(--space-lg) 0;
}

main section {
    margin-bottom: var(--space-lg);
}
</style>