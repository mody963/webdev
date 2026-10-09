<script lang="ts">

</script>

<template>
    <div class="page-container">
    <nav class = "nav-bar" >
    <ul class = "nav-bar">
    <li><RouterLink to="/">Home</RouterLink></li>
    <li><RouterLink to="/group-orders">Grouporders</RouterLink></li>
    <li><RouterLink to="/tastings">tastings</RouterLink></li>
    <li><RouterLink to="/the-shelf">The Shelf</RouterLink></li>
    <li class="right"><a href="about.asp">About</a></li>
    </ul>
    </nav>
    <header>
    <h1>Write a brew note</h1>
    <hr />
    </header>

    <main>
    <h2>Bags</h2>
    <section>
        <h2>Add brew note</h2>
        <p>Enter the details of your brew.</p>

        <form class="card">

            <div class="form-group">
                <label for="brewnote-title">Title:</label>
                <input
                    type="text"
                    id="brewnote-title"
                    class="form-input"
                    placeholder="e.g. Sweet & fruity (french press)"
                >
            </div>

            <div class="form-group">
                <label for="Bean">Bean name :</label>
                <input type="text" id="Bean-name" class="form-input" placeholder="e.g. arabica">
            </div>

            <div class="form-group">
                <label for="brew-method">Method:</label>
                <select id="brew-method" class="form-input">
                    <option value="Drip-machine">Drip machine</option>
                    <option value="espresso">Espresso</option>
                    <option value="french-press">French Press</option>
                    <option value="aeropress">AeroPress</option>
                    <option value="Pourover">Pourover</option>
                </select>
            </div>

            <div class="form-group">
                <label for="dose">Dose (grams):</label>
                <input type="number" id="dose" class="form-input" placeholder="e.g. 15" min="1" step="0.1">
            </div>

            <div class="form-group">
                <label for="grind">Grind:</label>
                <input type="text" id="grind" class="form-input" placeholder="e.g. Medium-fine / 24 clicks">
            </div>

            <div class="form-group">
                <label for="result">Result:</label>
                <textarea
                    id="result"
                    class="form-input"
                    placeholder="e.g. Sweet, fruity and balanced..."
                    rows="4"
                ></textarea>
            </div>

            <button id="create-btn" type="button" class="button-primary">
                Save brew note
            </button>

            <p id="create-status" class="status-message"></p>

        </form>
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