// JavaScript for Economics Quiz

const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Paris", "Madrid"],
    correct: "Paris",
  },
  {
    question: "Which economic system is based on supply and demand?",
    answers: ["Command", "Market", "Mixed"],
    correct: "Market",
  },
  {
    question: "Who is known as the father of modern economics?",
    answers: ["Karl Marx", "Adam Smith", "John Maynard Keynes"],
    correct: "Adam Smith",
  },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const formElement = document.getElementById("quiz-form");

// Initialize quiz
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Update question text
  questionElement.textContent = currentQuestion.question;

  // Clear previous answers
  answersElement.innerHTML = "";

  // Add answers dynamically
  currentQuestion.answers.forEach((answer) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${answer}">
      ${answer}
    `;
    answersElement.appendChild(label);
  });

  // Clear result message
  resultElement.textContent = "";
}

// Handle form submission
formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get selected answer
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    resultElement.textContent = "Please select an answer!";
    return;
  }

  // Check if answer is correct
  const answer = selectedAnswer.value;
  const correctAnswer = questions[currentQuestionIndex].correct;

  if (answer === correctAnswer) {
    resultElement.textContent = "Correct! 🎉";
    resultElement.style.color = "green";
    score++;
  } else {
    resultElement.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
    resultElement.style.color = "red";
  }

  // Update score
  scoreElement.textContent = `Score: ${score}`;

  // Move to next question after a short delay
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      updateProgressBar();
      loadQuestion();
    } else {
      endQuiz();
    }
  }, 1500);
});

// Update progress bar
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// End quiz
function endQuiz() {
  questionElement.textContent = "Quiz Complete!";
  answersElement.innerHTML = "";
  resultElement.textContent = `Your final score is ${score}/${questions.length}`;
  formElement.style.display = "none";
}

// Start quiz
loadQuestion();
updateProgressBar();