<script setup lang="ts">
import { useCoffeeBag } from '../composables/useCoffeeBags'
import { useBagTransfers } from '../composables/useBagTransfers'

const { incomingTransfers } = useBagTransfers()

const { myBags } = useCoffeeBag()
</script>

<template>
  <div class="page-container">
    <header>
      <h1>The Shelf</h1>
      <p class="intro">Track your coffee bags, share beans with club members, and discover your best brews!</p>
      <hr>
    </header>

    <main>
        <h2>MENU</h2>

    <div class="order-box">
      <h4>Options</h4>
      <ul>
        <li><a href="#coffee-bags" class="back-link"> View your coffee</a></li>
        <li><a href="#bag-transfers" class="back-link">Coffee bag transfers</a></li>
      </ul>
      <hr>
    </div>
      <section>
        <div id="coffee-bags">
        <h2>Your coffee</h2>
        </div>

        <p v-if="myBags.length === 0">No coffee bags found.</p>

        <article v-for="bag in myBags" :key="bag.id" class="card">
          <table class="data-table">
            <tbody>
              <tr><th>Bag holder</th><td>{{ bag.owner.name }}</td></tr>
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
    <section id="bag-transfers">
        <h2>Coffee bag transfers</h2>

        <article class="card">
        <h3>Transfer a bag</h3>
        <p>Request to send a coffee bag to someone else.</p>
        <RouterLink to="/transfers" class="button-primary">
        Transfer a bag
        </RouterLink>

        <hr>

        <p>
          You have {{ incomingTransfers.length }} pending transfer requests.
        </p>

        <RouterLink to="/transfers" class="button-primary">
          View transfer requests
        </RouterLink>
        </article>
    </section>
    </main>
  </div>
  <hr>
    <p class="footer-text">The Shelf &copy; the club</p>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

header {
  padding: var(--space-lg) 0;
}

main section {
  margin-bottom: var(--space-lg);
}
</style>