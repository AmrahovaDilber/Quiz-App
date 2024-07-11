import questions from './data.js';

class Quiz{
    constructor(questions) {
        this.questions = questions;
        this.index = 0;
        this.question=this.getQuestion()
    }

    getQuestion() {
        return this.questions[this.index]
    }

    

}

const quiz = new Quiz(questions)

console.log(quiz.getQuestion())