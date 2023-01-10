<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="container">
        <div class="panel">
            <h4 class="title">Sorry</h4>
            <p class="text">Page operation is not allowed</p>
            <RouterLink to="/">Go back to Start Quiz</RouterLink>
        </div>
    </div>
</template>

<style scoped>
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.title {
    font-size: 1.1rem;
    font-weight: bold;
}
.text {
    margin-bottom: 1rem;
}
</style>