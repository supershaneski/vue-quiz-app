import { ref, computed } from "vue";
import { defineStore } from "pinia";

import quizData from '../assets/questions.json'
import { shuffle, getToday } from '../lib/utils'

export const useCounterStore = defineStore("counter", () => {
  
  let defCount = 0
  let defQuestionIndex = -1
  let defScore = 0
  let defEndGame = false

  let refDate = ''
  let defQuestions = ''

  const savedData = localStorage.getItem("vue-app")
  if(savedData) {

    const rawData = JSON.parse(savedData)

    refDate = rawData.hasOwnProperty('date') ? rawData.date : ''
    defQuestions = rawData.hasOwnProperty('questions') ? rawData.questions : ''
    
    defEndGame = rawData.hasOwnProperty('endGame') ? Boolean(rawData.endGame) : defEndGame

    defCount = rawData.hasOwnProperty('count') ? parseInt(rawData.count) : defCount
    defQuestionIndex = rawData.hasOwnProperty('questionIndex') ? parseInt(rawData.questionIndex) : defQuestionIndex
    defScore = rawData.hasOwnProperty('score') ? parseInt(rawData.score) : defScore

  }

  let questionItems = quizData.items

  const today = getToday()

  if(refDate.length === 0 || defQuestions.length === 0 || (refDate.length > 0 && today > refDate)) {

    shuffle(questionItems)

    questionItems = questionItems.filter((qi, i) => i < 10).map((qi, i) => {

      let answers = [...qi.choices]
      shuffle(answers)

      return {
        ...qi,
        choices: answers,
        index: i,
      }
    })

    defQuestions = questionItems.reduce((d, curvalue) => {
      return d.length > 0 ? [d, curvalue.id].join(',') : String(curvalue.id)
    }, "")

  } else {

    const listQuestions = defQuestions.split(",")

    questionItems = questionItems.filter(qi => listQuestions.some(lq => qi.id === parseInt(lq))).map((qi, i) => {

      let answers = [...qi.choices]
      shuffle(answers)

      return {
        ...qi,
        choices: answers,
        index: i,
      }
    })

  }
  
  const count = ref(defCount);
  const questions = ref(questionItems)
  const questionIndex = ref(defQuestionIndex)
  const questionCount = ref(questionItems.length)
  const score = ref(defScore)
  const endGame = ref(defEndGame)
  const questionList = ref(defQuestions)

  const doubleCount = computed(() => count.value * 2);

  function setQuizData(data) {

    questions.value = data
    questionCount.value = data.length

    const list = data.reduce((d, curvalue) => {
      return d.length > 0 ? [d, curvalue.id].join(',') : String(curvalue.id)
    }, "")

    questionList.value = list

  }

  function setEndGame() {

    endGame.value = true

    const today = getToday()
    
    localStorage.setItem("vue-app", JSON.stringify({ endGame: endGame.value, questions: questionList.value, date: today, score: score.value, count: count.value, questionIndex: questionIndex.value }))
    
  }

  function resetQuiz() {

    questionIndex.value = -1
    score.value = 0
    endGame.value = false

    const today = getToday()
    
    localStorage.setItem("vue-app", JSON.stringify({ endGame: endGame.value, questions: questionList.value, date: today, score: 0, count: count.value, questionIndex: -1 }))

  }

  function resetQuestionIndex() {

    questionIndex.value = -1

    const today = getToday()

    localStorage.setItem("vue-app", JSON.stringify({ endGame: endGame.value, questions: questionList.value, date: today, score: score.value, count: count.value, questionIndex: -1 }))

  }

  function setQuestionIndex(n) {

    n = parseInt(n)

    if(isNaN(n)) return
    if(n < 0 || n >= questionCount) return

    questionIndex.value = n

    const today = getToday()

    localStorage.setItem("vue-app", JSON.stringify({ endGame: endGame.value, questions: questionList.value, date: today, score: score.value, count: count.value, questionIndex: n }))

  }

  function getQuestion(n) {

    return questions.value[n]

  }

  function increment() {
    
    count.value++;

    const today = getToday()

    localStorage.setItem("vue-app", JSON.stringify({ endGame: endGame.value, questions: questionList.value, date: today, score: score.value, count: count.value, questionIndex: questionIndex.value }))

  }

  function resetScore() {
    score.value = 0
  }

  function incrementScore() {
    
    score.value++;

    const today = getToday()

    localStorage.setItem("vue-app", JSON.stringify({ endGame: endGame.value, questions: questionList.value, date: today, score: score.value, count: count.value, questionIndex: questionIndex.value }))

  }

  return { endGame, score, questions, questionCount, questionIndex, setQuizData, setEndGame, resetQuiz, resetScore, incrementScore, getQuestion, resetQuestionIndex, setQuestionIndex, count, doubleCount, increment };
});
