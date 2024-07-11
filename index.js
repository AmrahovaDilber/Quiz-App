import questions from "./data.js";
const questionTitle = document.querySelector("#question");
const options = document.querySelector("#options");
const nextQuestion = document.querySelector("#nextQuestion");
const currentQuestion = document.querySelector("#currentQuestion");
const totalQuestion = document.querySelector("#totalQuestion");

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
    totalQuestion.innerHTML = this.questions.length;
    currentQuestion.innerHTML = this.index + 1;

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
    nextQuestion.classList.add("hidden");
    options.style.pointerEvents = "initial";
    this.question = this.getQuestion();
    this.start();
    currentQuestion.innerHTML = this.index + 1;
  }
  designOption(variant, text) {
    return `
        <div
        data-variant="${variant}"
        class="py-[9px] px-[12px] border rounded-lg ">
        <b>${variant}.</b>${text.toHtmlEntities()}
        </div>`;
  }
  checkVariant(variant) {
    const el = options.querySelector(`[data-variant="${variant}"]`);
    options.style.pointerEvents = "none";
    nextQuestion.classList.remove("hidden");
    if (
      this.question.correct.toString().toLowerCase() ===variant.toString().toLowerCase()
    ) {
      el.classList.add("bg-green-500");
    } else {
      el.classList.add("bg-red-500");
    }
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

    options.addEventListener("click", (e) => {
      const variant = e.target.getAttribute("data-variant");

      if (variant) {
        this.checkVariant(variant);
      }
    });
  }
}

const quiz = new Quiz(questions);

console.log(quiz.getQuestion());
quiz.start();
