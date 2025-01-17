const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

let shuffledQuestions, currentQuestionIndex, score, timer, intervalId;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  timer = 60;
  scoreElement.innerText = "Score: " + score;
  timerElement.innerText = "Time: " + timer;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  startTimer();
}

function startTimer() {
  intervalId = setInterval(() => {
    timer--;
    timerElement.innerText = "Time: " + timer;
    if (timer === 0) {
      clearInterval(intervalId);
      alert("Time is up! Your score: " + score);
      resetGame();
    }
  }, 1000);
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++;
    scoreElement.innerText = "Score: " + score;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    clearInterval(intervalId);
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function resetGame() {
  clearInterval(intervalId);
  startButton.innerText = "Start";
  startButton.classList.remove("hide");
  questionContainerElement.classList.add("hide");
  scoreElement.innerText = "Score: 0";
  timerElement.innerText = "Time: 0";
}

const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
      { text: "5", correct: false },
      { text: "3", correct: false },
    ],
  },
  {
    question: "What is 3 + 5?",
    answers: [
      { text: "8", correct: true },
      { text: "10", correct: false },
      { text: "15", correct: false },
      { text: "5", correct: false },
    ],
  },
  // Add more questions as needed
];
