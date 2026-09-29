<script setup lang="ts">
</script>

<template>
    <header>
        <p>
            <a href="/" class="back-link">
                &larr; Back to Main Menu
            </a>
        </p>

        <h1>Group Orders</h1>
    </header>

    <p class="intro">
        Order coffee together with other members of the club!
    </p>

    <hr>

    <h2>MENU</h2>

    <div class="order-box">
        <h4>Options</h4>

        <ul>
            <li>
                <a href="#" class="back-link">All Orders</a>
            </li>

            <li>
                <a href="#" class="back-link">Open Orders</a>
            </li>

            <li>
                <a href="#" class="back-link">Closed Orders</a>
            </li>

            <li>Status Open Orders</li>
        </ul>

        <a href="#" class="button-primary">
            + Start New Order
        </a>

        <hr>
    </div>

    <!-- All orders -->
    <div class="card">
        <h4>All Orders</h4>

        <p>
            Take a look at all group orders that have been made.
            <br>
            You can explore the orders and sort them by date, costs or members.
        </p>

        <a href="#" class="back-link">
            View All Orders &#8594;
        </a>
    </div>

    <!-- Open orders -->
    <div class="card">
        <h4>Open Orders</h4>

        <p>
            These orders are still open and accepting new items.
            <br>
            You can join an open order or, if you started it, add to it or
            change it while it remains open.
            <br>
            Only the starter or a committee member with the right permissions
            can cancel an open order.
        </p>

        <a href="#" class="back-link">
            View Open Orders &#8594;
        </a>
    </div>

    <!-- Closed orders -->
    <div class="card">
        <h4>Closed Orders</h4>

        <p>
            Orders that have already been closed can no longer be changed or joined.
            <br>
            You can still view what was ordered, by who, and for how much.
        </p>

        <a href="#" class="back-link">
            View Closed Orders &#8594;
        </a>
    </div>

    <!-- Status open orders -->
    <div class="card">
        <h4>Status Open Orders</h4>

        <p>
            Quick overview of how the currently open orders are progressing:
            how many members joined so far and the current total costs.
        </p>

        <table class="data-table">
            <tr>
                <th>Order</th>
                <th>Started by</th>
                <th>Members</th>
                <th>Total costs</th>
            </tr>

            <tr>
                <td>Example Order</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
    </div>

    <hr>

    <p class="footer-text">
        Group Orders &copy; the club
    </p>
</template>