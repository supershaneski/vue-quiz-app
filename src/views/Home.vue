<script setup>
import { useCounterStore } from "../stores/counter";
</script>

<script>
export default {
    methods: {
        gotoScore() {

            const store = useCounterStore()

            store.resetScore()
            store.increment()
            store.setQuestionIndex(0)

            setTimeout(() => {
                this.$router.push('/question/0')
            }, 400)
        }
    }
}
</script>

<template>
    <div class="container">
      <button class="button" @click="gotoScore">Start&nbsp;<img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
    />&nbsp;Quiz</button>
    </div>
</template>

<style scoped>
.container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo {
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s ease-in;
}
.button:hover .logo {
    transform: rotateZ(180deg);
}
</style>