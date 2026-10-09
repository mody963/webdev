<script lang="ts">

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
    <article class="card">
        <table class="data-table">
            <tr>
                <th>Bag holder</th>
                <td>--</td>
            </tr>
            <tr>
                <th>Roaster</th>
                <td>--</td>
            </tr>
            <tr>
                <th>Grams</th>
                <td></td>
            </tr>
            <tr>
                <th>Day of arrival</th>
                <td>--</td>
            </tr>
            <tr>
                <th>Bag Freshness</th>
                <td>--</td>
            </tr>
            <tr>
                <th>Finished</th>
                <td>--</td>
            </tr>
        </table>
        <a href="" class= "forward-link">View brewing notes</a>
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