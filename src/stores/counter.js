import { ref, computed } from "vue";
import { defineStore } from "pinia";

import quizData from '../assets/questions.json'
import { shuffle } from '../lib/utils'

export const useCounterStore = defineStore("counter", () => {
  
  let defCount = 0
  let defQuestionIndex = -1
  let defScore = 0

  const savedData = localStorage.getItem("vue-app")
  if(savedData) {

    const rawData = JSON.parse(savedData)

    //console.log("rawdata", rawData)

    defCount = rawData.hasOwnProperty('count') ? parseInt(rawData.count) : defCount
    defQuestionIndex = rawData.hasOwnProperty('questionIndex') ? parseInt(rawData.questionIndex) : defQuestionIndex
    defScore = rawData.hasOwnProperty('score') ? parseInt(rawData.score) : defScore

  }

  let questionItems = quizData.items
  shuffle(questionItems)

  questionItems = questionItems.map((qi, i) => {

    let answers = [...qi.choices]
    shuffle(answers)

    return {
      ...qi,
      choices: answers,
      index: i,
    }
  })

  //console.log(questionItems)
  //const count = ref(0);
  
  const count = ref(defCount);

  const questions = ref(questionItems)

  const questionIndex = ref(defQuestionIndex)

  const questionCount = ref(questionItems.length)

  const score = ref(defScore)

  const doubleCount = computed(() => count.value * 2);

  function resetQuestionIndex() {

    questionIndex.value = -1

    localStorage.setItem("vue-app", JSON.stringify({ score: score.value, count: count.value, questionIndex: -1 }))

  }

  function setQuestionIndex(n) {

    n = parseInt(n)

    if(isNaN(n)) return
    if(n < 0 || n >= questionCount) return

    questionIndex.value = n

    localStorage.setItem("vue-app", JSON.stringify({ score: score.value, count: count.value, questionIndex: n }))

  }

  function getQuestion(n) {

    return questions.value[n]

  }

  function increment() {
    
    count.value++;

    //console.log("count.value", count.value)

    localStorage.setItem("vue-app", JSON.stringify({ score: score.value, count: count.value, questionIndex: questionIndex.value }))

  }

  function resetScore() {
    score.value = 0
  }

  function incrementScore() {
    
    score.value++;

    localStorage.setItem("vue-app", JSON.stringify({ score: score.value, count: count.value, questionIndex: questionIndex.value }))

  }

  return { score, questions, questionCount, questionIndex, resetScore, incrementScore, getQuestion, resetQuestionIndex, setQuestionIndex, count, doubleCount, increment };
});
