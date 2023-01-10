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
    const endFlag = store.endGame

    let errFlag = false

    if(index < 0 || !endFlag) {

      errFlag = true

      this.$router.push('/error')

    } else {

      if(total !== index + 1) {

        errFlag = true

        this.$router.push('/error')

      }

    }
    
    return {
      store: store,
      score: errFlag ? null : store.score,
    }
  },
  computed: {
    getPageTitle() {

      if(this.score === 0) {
        return "Tough Luck!"
      } else if(this.score > 0 && this.score < 5) {
        return "You Can Do Better!"
      } else if(this.score === 10) {
        return "Perfect Score!"
      } else {
        return "Nice Score!"
      }

    }
  }
}
</script>

<template>
    <div v-if="score !== null" class="container">
      <div class="panel">
        <h4 class="title">{{ getPageTitle }}</h4>
        <p class="text">
          Your Score is <span class="score">{{ score }}</span>/{{ store.questionCount }}
        </p>
        <RouterLink to="/">Try Quiz Again?</RouterLink>
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
  align-items: center;
}
.title {
  font-size: 1.1rem;
  font-weight: bold;
}
.text {
  margin-bottom: 1rem;
}
.score {
  font-size: 1.5rem;
  font-weight: 600;
}
</style>