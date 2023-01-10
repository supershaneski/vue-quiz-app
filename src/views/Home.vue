<script setup>
import { useCounterStore } from "../stores/counter";
</script>

<script>
export default {
    data() {
        const store = useCounterStore()

        return {
            store,
        }
    },
    mounted() {
        
        this.store.resetQuiz()

    },
    methods: {
        startQuiz() {

            this.store.resetScore()
            this.store.increment()
            this.store.setQuestionIndex(0)
            
            this.$router.push('/question/0')
        }
    }
}
</script>

<template>
    <div class="container">
      <button class="button" @click="startQuiz">Start Quiz</button>
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
</style>