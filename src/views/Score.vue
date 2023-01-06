<script setup>
import { RouterLink } from "vue-router"
import { useCounterStore } from '../stores/counter'
</script>

<script>
export default {

  data() {

    const store = useCounterStore()

    const total = store.questionCount
    const index = store.questionIndex

    console.log("score:data", total, index)

    let errFlag = false

    if(total !== index + 1) {

      console.log("wwww")

      errFlag = true
      this.$router.push('/')
    }

    return {
      store: store,
      score: errFlag ? null : store.score,
      count: 0,
    }
  },

  mounted() {

    //this.score = this.store.count

    this.store.resetQuestionIndex()

  }
}
</script>

<template>
    <div v-if="score !== null" class="container">
      <div class="panel">
        <h4>Your Score is <span class="score">{{ score }}</span>/{{ store.questionCount }}</h4>
        <button @click="count++">Count is {{ count }}</button>
        <RouterLink to="/">Back to Home</RouterLink>
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
.score {
  font-size: 1.5rem;
  font-weight: 600;
}
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.panel * {
  margin-bottom: 1rem;
}
</style>