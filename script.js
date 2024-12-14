// JavaScript for Enhanced Left or Quiz with Styling

const questions = [
  { 
    question: "Big state or Small state?", 
    answers: ["Big State", "Mostly Big State", "Neutral", "Mostly Small State", "Small State"], 
    scale: 0, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Government intervention or Free market?", 
    answers: ["High Intervention", "Mostly Intervention", "Neutral", "Mostly Free Market", "Free Market"], 
    scale: 0, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Strict laws or Personal freedoms?", 
    answers: ["Strict Laws", "Mostly Strict Laws", "Neutral", "Mostly Personal Freedoms", "Personal Freedoms"], 
    scale: 1, 
    scores: [-2, 2, 0, 1, -1]
  },
  { 
    question: "Welfare programs or Minimal state aid?", 
    answers: ["Welfare Programs", "Mostly Welfare Programs", "Neutral", "Mostly Minimal Aid", "Minimal State Aid"], 
    scale: 1, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Change or Stability?", 
    answers: ["Radical Change", "Mostly Change", "Neutral", "Mostly Stability", "Complete Stability"], 
    scale: 2, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Reform or Tradition?", 
    answers: ["Complete Reform", "Mostly Reform", "Neutral", "Mostly Tradition", "Complete Tradition"], 
    scale: 2, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Human rights or Divine will?", 
    answers: ["Human Rights", "Mostly Human Rights", "Neutral", "Mostly Divine Will", "Divine Will"], 
    scale: 3, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Secularism or Religious influence?", 
    answers: ["Secularism", "Mostly Secularism", "Neutral", "Mostly Religious Influence", "Religious Influence"], 
    scale: 3, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Trust in authority or Skepticism?", 
    answers: ["Complete Trust", "Mostly Trust", "Neutral", "Mostly Skepticism", "Complete Skepticism"], 
    scale: 4, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Follow rules or Challenge norms?", 
    answers: ["Follow Rules", "Mostly Follow Rules", "Neutral", "Mostly Challenge Norms", "Challenge Norms"], 
    scale: 4, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Homogeneity or Diversity?", 
    answers: ["Complete Homogeneity", "Mostly Homogeneity", "Neutral", "Mostly Diversity", "Complete Diversity"], 
    scale: 5, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Cultural Preservation or Multiculturalism?", 
    answers: ["Cultural Preservation", "Mostly Preservation", "Neutral", "Mostly Multiculturalism", "Complete Multiculturalism"], 
    scale: 5, 
    scores: [-2, -1, 0, 1, 2]
  },
  { 
    question: "Ego strength: How self-centered are you?", 
    answers: ["Moderately", "Very", "Extremely"], 
    scale: 6, 
    scores: [1, 2, 3]
  },
  { 
    question: "Ego strength: How assertive are you?", 
    answers: ["Moderately", "Very", "Extremely"], 
    scale: 6, 
    scores: [1, 2, 3]
  }
];

let currentQuestionIndex = 0;
const scaleScores = Array(7).fill(0);
const scaleCounts = Array(7).fill(0);
const scaleNames = [
  "Big State -> Small State",
  "Nanny State -> Liberal State",
  "Progressive -> Status Quo",
  "Humanist -> Higher Power",
  "Authority Trust -> Conspiracy",
  "Non-Diverse -> Multicultural",
  "Ego Scale"
];

// DOM Elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const resultElement = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");
const formElement = document.getElementById("quiz-form");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer, idx) => {
    const label = document.createElement("label");
    label.innerHTML = `
      <input type="radio" name="answer" value="${idx}">
      ${answer}
    `;
    answersElement.appendChild(label);
  });
  resultElement.textContent = "";
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function endQuiz() {
  questionElement.textContent = "Here are your results!";
  answersElement.innerHTML = "";
  formElement.style.display = "none";
  resultElement.innerHTML = "<h2>Results:</h2>";

  const averages = scaleScores.slice(0, 6).map((score, idx) =>
    scaleCounts[idx] > 0 ? (score / scaleCounts[idx]).toFixed(2) : 0
  );

  scaleNames.slice(0, 6).forEach((scale, idx) => {
    const average = averages[idx];
    const sliderContainer = document.createElement('div');
    sliderContainer.style.marginBottom = '20px';

    const label = document.createElement('label');
    label.textContent = `${scale}: ${average}`;
    label.style.display = 'block';
    label.style.color = '#333';

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = -2;
    slider.max = 2;
    slider.step = 0.01;
    slider.value = average;
    slider.disabled = true;
    slider.style.width = '100%';
    slider.style.background = `linear-gradient(90deg, red ${50 + (average * 25)}%, blue)`;

    sliderContainer.appendChild(label);
    sliderContainer.appendChild(slider);
    resultElement.appendChild(sliderContainer);
  });

  const ctx = document.getElementById('resultsChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: scaleNames.slice(0, 6),
      datasets: [{
        label: 'Quiz Results',
        data: averages,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1, // Controls the aspect ratio, 1 = square
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const scaleName = scaleNames[context.dataIndex];
              return `${scaleName}: ${context.raw}`;
            }
          }
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          min: -2,
          max: 2,
          ticks: {
            stepSize: 1,
            color: '#666'
          },
          pointLabels: {
            callback: function (value, index) {
              return scaleNames[index];
            },
            font: {
              size: 12,
              weight: 'bold'
            }
          }
        }
      }
    }
  });  
}

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    resultElement.textContent = "Please select an answer!";
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedValue = parseInt(selectedAnswer.value);
  const score = currentQuestion.scores[selectedValue];

  scaleScores[currentQuestion.scale] += score;
  scaleCounts[currentQuestion.scale]++;

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    updateProgressBar();
    loadQuestion();
  } else {
    endQuiz();
  }
});

loadQuestion();
updateProgressBar();