<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
    <div class="container">
        <div class="panel">
            <h4 class="title">Page Not Found</h4>
            <p class="text">The page you are looking for is not found</p>
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