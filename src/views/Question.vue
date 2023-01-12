<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router"
import { useCounterStore } from "../stores/counter";

import ListItem from '../components/ListItem.vue';
import Modal from '../components/Dialog.vue';

const store = useCounterStore()
const router = useRouter()
const route = useRoute()

const index = parseInt(route.params.id)
        
let errFlag = false;
let errSite = false;

const endFlag = store.endGame
if(endFlag) {
    errSite = true
} else {

    if(isNaN(index)) {
        errFlag = true
    } else {

        if(index < 0 || index >= store.questionCount) {
            errFlag = true
        } else if(index !== store.questionIndex) {
            errSite = true
        }
    }

}

if(errFlag) {
    router.push('/notfound')
} else if(errSite) {
    router.push('/error')
}

const question = ref(errFlag || errSite ? null : store.getQuestion(index))
const isLastQuestion = ref(errFlag || errSite ? false : index === store.questionCount - 1)
const selected = ref(null)
const isSubmitted = ref(false)

const openDialog = ref(false);
const nextFlag = ref(true);

function showDialog() {
    openDialog.value = true
}

function closeDialog() {
    openDialog.value = false
}

function gotoNextQuestion() {

    nextFlag.value = false
            
    const nextid = parseInt(route.params.id) + 1
    store.setQuestionIndex(nextid)
    router.push(`/question/${nextid}`)

}

function gotoScore() {

    store.setEndGame()
    router.push('/score')

}

function quitQuiz() {

    openDialog.value = false

    setTimeout(() => {
        store.resetQuiz()
        router.push('/')
    }, 200)

}

function selectAnswer(n) {
    selected.value = n
}

function submitAnswer() {

    if(selected.value === null) return

    if(selected.value === question.value.answer) {
        store.incrementScore()
    }

    isSubmitted.value = !isSubmitted.value

}

const questionNumber = computed(() => {
    return [parseInt(route.params.id) + 1, store.questionCount].join(' of ')
})

watch(() => route.path, (path, oldPath) => {

    if(path.indexOf("/question") < 0) return

    const index = parseInt(route.params.id)
    
    let errFlag = false;
    let errSite = false;

    if(isNaN(index)) {
        errFlag = true
    } else {

        if(index < 0 || index >= store.questionCount) {
            errFlag = true
        } else if(index !== store.questionIndex) {
            errSite = true
        }
    }

    if(errFlag) {
        router.push('/notfound');
    } else if(errSite) {
        router.push('/error');
    }

    selected.value = null
    isSubmitted.value = false
    question.value = store.getQuestion(index)
    isLastQuestion.value = index === store.questionCount - 1
    
    if(!errFlag || !errSite) {
        setTimeout(() => {
            nextFlag.value = true
        }, 500)
    }

})
</script>

<template>
    <div class="wrapper">
        <div v-if="question" class="container">
            <div class="question">
                <div class="question-content">
                    <Transition name="question-slide">
                        <div v-show="nextFlag" class="question-main">
                            <h4 class="title">Question {{ questionNumber }}</h4>
                            <p class="question-header">
                                <span class="question-category">{{ question.category }}</span>
                                <span class="question-difficulty">{{ question.difficulty }}</span>
                            </p>
                            <p class="text" v-html="question.text"></p>
                            <ul class="answers">
                                <ListItem v-for="ans in question.choices" 
                                :key="ans.id" 
                                :id="ans.id" 
                                :text="ans.text" 
                                :disabled="isSubmitted" 
                                :selected="ans.id === selected"
                                :is-correct="isSubmitted && selected === ans.id ? question.answer === ans.id : null"
                                @select="selectAnswer"
                                />
                            </ul>
                        </div>
                    </Transition>
                </div>
                <div class="action">
                    <button class="error" @click="showDialog">Quit</button>
                    <div class="subaction">
                        <button class="button" :disabled="isSubmitted || selected === null" @click="submitAnswer">Submit Answer</button>
                        <button class="button" v-if="!isLastQuestion" :disabled="!isSubmitted" @click="gotoNextQuestion">Next Question</button>
                        <button class="button" v-if="isLastQuestion" :disabled="!isSubmitted" @click="gotoScore">View Score</button>
                    </div>
                </div>
            </div>
        </div>
        <Teleport to="body">
            <modal :open="openDialog" @close="closeDialog">
                <template #header>
                    <h4 class="dialog-title">Quit Quiz</h4>
                </template>
                <template #body>
                    <p class="dialog-text">Are you sure you want to quit?</p>
                </template>
                <template #footer>
                    <div class="dialog-action">
                        <button @click="quitQuiz" class="dialog-button">OK</button>
                        <button @click="closeDialog" class="dialog-button">Cancel</button>
                    </div>
                </template>
            </modal>
        </Teleport>
    </div>
</template>

<style scoped>
.question-content {
    position: relative;
    height: 42vh;
    overflow-x: hidden;
}
.question-main {
    position: relative;
}
.question-header {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem;
}
.question-category {
    font-weight: 600;
}
.question-difficulty {
    font-weight: 600;
    text-transform: capitalize;
}
.dialog-title {
    color: var(--color-text-green);
    font-size: 1.1rem;
    font-weight: 600;
}
.dialog-text {
    color: var(--vt-c-black-soft);
}
.dialog-action {
    display: flex;
    justify-content: flex-end;
}
.dialog-button {
    margin-left: 0.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
}
.wrapper {
    position: relative;
    height: 100%;
}
.container {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.question {
    position: relative;
    width: 100%;
    max-width: 500px;
    padding: 2rem 1rem;
}
.title {
    font-size: 1.2rem;
    font-weight: 600;
}
.text {
    /*padding: 1rem 0;*/
    margin: 0.5rem 0 2rem;
}
.answers {
    position: relative;
    display: block;
    list-style: none;
    padding: 0;
    width: 100%;
}
.action {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
}
.button {
    margin-left: 0.5rem;
}
.error {
    color: var(--color-text-red);
}

@media (max-width: 400px) {
  .action {
    flex-direction: column-reverse;
  }
  .button {
    margin-left: 0;
    margin-bottom: 0.5rem;
    width: 100%;
  }
  .error {
    margin-top: 1rem;
  }
  .question-content {
    height: 48vh;
  }
}

/* transition */
.question-slide-enter-active {
  transition: all 0.45s ease-out;
}

.question-slide-leave-active {
  /*transition: all 0.9s cubic-bezier(1, 0.5, 0.8, 1);*/
  transition: all 0.45s ease-out;
}

.question-slide-enter-from,
.question-slide-leave-to {
  transform: translateX(50%);
  opacity: 0;
}
</style>