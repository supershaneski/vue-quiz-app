<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router"
import { useCounterStore } from "../stores/counter";

const store = useCounterStore()
const router = useRouter()

function startQuiz() {

    store.resetScore()
    store.increment()
    store.setQuestionIndex(0)

    router.push('/question/0')

}

onMounted(() => {

    store.resetQuiz()

})

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