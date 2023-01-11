<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter";
import { getRemoteData, shuffle } from "../lib/utils";

import StarButton from '../components/StartButton.vue'

const store = useCounterStore()
const router = useRouter()

const loading = ref(false)
const error = ref(false)

function startQuiz() {

    store.resetScore()
    store.increment()
    store.setQuestionIndex(0)

    router.push('/question/0')

}

onMounted(async () => {

    store.resetQuiz()

    getRemoteData().then(data => {
        
        let raw_questions = data.results ? data.results : null
        if(raw_questions) {

            raw_questions = raw_questions.map((item, index) => {

                const answers = [item.correct_answer, ...item.incorrect_answers]

                let choices = answers.map((ans, i) => {
                    return {
                        id: i,
                        text: ans,
                    }
                })

                shuffle(choices)

                return {
                    ...item,
                    answers,
                    id: index,
                    text: item.question,
                    answer: 0,
                    choices,
                }
            })

            store.setQuizData(raw_questions)

        }

    }).catch(err => {
        console.log(err)
    })

})
</script>

<template>
    <div class="container">
      <StarButton @click="startQuiz">Start Quiz</StarButton>
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