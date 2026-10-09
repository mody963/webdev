<script lang="ts">

</script>

<template>
    <div class="page-container">
    <nav class="nav-bar">
    <ul class = "nav-bar">
    <!-- <p><a href="../index.html" class = "back-link">&larr; Back to Main Menu</a></p>-->
    <li><RouterLink to="/">Home</RouterLink></li>
    <li><RouterLink to="/group-orders">Grouporders</RouterLink></li>
    <li><RouterLink to="/tastings">tastings</RouterLink></li>
    <li class="right"><a href="about.asp">About</a></li>
    </ul>
    </nav>
    <header>
    <h1>My Shelf</h1>
    <hr />
    </header>

    <main>
    <section>
    <h2>Your coffee</h2>
    <article class="card">
        <h3></h3>
        <p>2 Coffee bags</p>
        <p>-- grams</p>
        <li><RouterLink to="/my-bags"class="forward-link">My Coffee bags</RouterLink></li>
    </article>
    </section>
    <section>
        <li><RouterLink to="/write-brewnote"class="forward-link">+ Write a brewnote</RouterLink></li>
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