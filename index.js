import questions from "./data.js";
const questionTitle = document.querySelector("#question");
const options = document.querySelector("#options");
const nextQuestion = document.querySelector("#nextQuestion");

String.prototype.toHtmlEntities = function () {
  return this.replace(/./gm, function (s) {
    return s.match(/[a-z0-9\s]+/i) ? s : "&#" + s.charCodeAt(0) + ";";
  });
};

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.index = 0;
    this.question = this.getQuestion();
    nextQuestion.addEventListener("click", () => {
      this.nextQuestion();
    });
  }

  getQuestion() {
    return this.questions[this.index];
  }

  nextQuestion() {
    if (this.index < this.questions.length - 1) {
      this.index++;
    } else {
      console.log("Oyun Bitdi");
    }
    this.question = this.getQuestion();
    this.start();
  }
  designOption(variant, text) {
    return `
        <div
        data-option='true'
        class="py-[9px] px-[12px] border rounded-lg ">
        <b>${variant}.</b>${text.toHtmlEntities()}
        </div>`;
  }

  start() {
    questionTitle.innerHTML = `<b>${this.index + 1}</b> ${this.question.text}`;
    options.innerHTML = "";
    for (let option of Object.keys(this.question.options)) {
      options.innerHTML += this.designOption(
        option,
        this.question.options[option]
      );
    }
  }
}

const quiz = new Quiz(questions);

console.log(quiz.getQuestion());
quiz.start();
