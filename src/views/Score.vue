<script setup>
import { ref, computed } from "vue";
import { useRouter, RouterLink } from "vue-router"
import { useCounterStore } from '../stores/counter'

const store = useCounterStore()
const router = useRouter()

const total = store.questionCount
const index = store.questionIndex
const endFlag = store.endGame

const errFlag = index < 0 || !endFlag || index >= 0 && (total !== index + 1) ? true : false

if(errFlag) {
  router.push('/error')
}

const score = ref(errFlag ? null : store.score)
const count = ref(errFlag ? null : store.questionCount)

const getPageTitle = computed(() => {
  
  if(score.value === 0) {
    return "Tough Luck!"
  } else if(score.value > 0 && score.value < 5) {
    return "You Can Do Better!"
  } else if(score.value === 10) {
    return "Perfect Score!"
  } else {
    return "Nice Score!"
  }

})
</script>

<template>
  <div v-if="score !== null" class="container">
    <div class="panel">
      <h4 class="title">{{ getPageTitle }}</h4>
      <p class="text">
        Your Score is <span class="score">{{ score }}</span>/{{ count }}
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