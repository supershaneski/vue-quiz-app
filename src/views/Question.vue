<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "../stores/counter";
</script>

<script>
import ListItem from '../components/ListItem.vue';

export default {
    components: {
        ListItem,
    },  
    data() {

        const store = useCounterStore()

        const index = parseInt(this.$route.params.id)
        
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

        console.log("---aaa---")

        if(errFlag) {
            this.$router.push('/notfound')
            //return {}
        } else if(errSite) {
            this.$router.push('/error')
            //return {}
        }

        console.log("---bbb---", `count: ${store.count}`)
        
        const isLastQuestion = index === store.questionCount - 1

        const questionData = store.getQuestion(index)

        return {
            store: store,
            question: errFlag || errSite ? null : questionData,
            isLastQuestion: errFlag || errSite ? false : isLastQuestion,
            selected: null,
            isSubmitted: false,
        }
    },
    watch: {
        $route({ path }) {

            console.log("watch:question", path)
            
            if(path.indexOf("/question") < 0) return

            const index = parseInt(this.$route.params.id)
            
            let errFlag = false;
            let errSite = false;

            if(isNaN(index)) {
                errFlag = true
            } else {

                if(index < 0 || index >= this.store.questionCount) {
                    errFlag = true
                } else if(index !== this.store.questionIndex) {
                    errSite = true
                }
            }

            if(errFlag) {
                this.$router.push('/notfound');
            } else if(errSite) {
                this.$router.push('/error');
            }

            const questionData = this.store.getQuestion(index)

            //console.log("watch:store-count", index, this.store.questionCount)

            const isLastQuestion = index === this.store.questionCount - 1

            this.selected = null
            this.isSubmitted = false

            this.question = questionData

            this.isLastQuestion = isLastQuestion

        }
    },
    /*mounted() {

        const index = parseInt(this.$route.params.id)
        const question = this.store.getQuestion(index)

        console.log(question)

    },*/
    methods: {
        gotoNextQuestion() {
            
            const nextid = parseInt(this.$route.params.id) + 1
            this.store.setQuestionIndex(nextid)
            this.$router.push(`/question/${nextid}`)
        },
        gotoScore() {
            this.$router.push('/score')
        },
        gotoHome() {
            this.$router.push('/')
        },
        selectAnswer(n) {
            //console.log("question:select", n)
            this.selected = n
        },
        submitAnswer() {

            if(this.selected === null) return

            if(this.selected === this.question.answer) {
                this.store.incrementScore()
            }

            this.isSubmitted = !this.isSubmitted
        }
    },
    computed: {
        questionNumber() {
            return [parseInt(this.$route.params.id) + 1, this.store.questionCount].join(' / ')
        }
    }
}

/*
<li v-for="ans in question.choices" :key="ans.id">
                <input :disabled="isSubmitted" type="radio" :id="ans.id" :value="ans.id" v-model="selected" />
                <label :for="ans.id">{{ans.text}}</label>
                <span v-if="isSubmitted && selected === ans.id && question.answer === ans.id" class="correct">&#10003;</span>
                <span v-if="isSubmitted && selected === ans.id && question.answer !== ans.id" class="wrong">&#10007;</span>
            </li>
*/
</script>

<template>
    <div v-if="question" class="container">
        <div class="question">
            <h4 class="title">Question {{ questionNumber }}</h4>
            <p class="text">
            {{ question.text }}
            </p>
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
            <div class="action">
                <button class="error" @click="gotoHome">Quit</button>
                <div class="subaction">
                    <button class="button" :disabled="isSubmitted || selected === null" @click="submitAnswer">Submit Answer</button>
                    <button class="button" v-if="!isLastQuestion" :disabled="!isSubmitted" @click="gotoNextQuestion">Next Question</button>
                    <button class="button" v-if="isLastQuestion" :disabled="!isSubmitted" @click="gotoScore">View Score</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.question {
    width: 100%;
    max-width: 500px;
    padding: 2rem 1rem;
}
.title {
    font-size: 1.2rem;
    font-weight: 600;
}
.text {
    padding: 1rem 0;
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
</style>