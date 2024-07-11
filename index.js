import questions from "./data.js";
const questionTitle = document.querySelector("#question");

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.index = 0;
    this.question = this.getQuestion();
  }

  getQuestion() {
    return this.questions[this.index];
  }

  start() {
    questionTitle.innerHTML = `<b>${this.index + 1}</b> ${this.question.text}`;
  }
}

const quiz = new Quiz(questions);

console.log(quiz.getQuestion());
quiz.start();
