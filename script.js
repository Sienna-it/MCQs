const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Madrid", "Rome"],
    answer: 1
  },
  {
    question: "2 + 2 equals?",
    options: ["3", "4", "5", "6"],
    answer: 1
  }
];

let startTime, timerInterval;
const questionTimes = new Array(questions.length).fill(0);
let currentQuestionIndex = 0;
let questionStartTime = null;

const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const quizForm = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const resultScreen = document.getElementById('result-screen');
const timeEl = document.getElementById('time');

let countdownTime = 600; // 10 minutes in seconds

function formatTime(seconds) {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${mins}:${secs}`;
}

function startTimer() {
  timeEl.textContent = formatTime(countdownTime);
  timerInterval = setInterval(() => {
    countdownTime--;
    timeEl.textContent = formatTime(countdownTime);

    if (countdownTime <= 60) {
      timeEl.style.color = 'red';
      timeEl.style.fontSize = '1.5rem';
      timeEl.classList.add('flash');
    }

    if (countdownTime <= 0) {
      clearInterval(timerInterval);
      submitBtn.disabled = true;
      alert("Time's up! Submitting your test.");
      submitBtn.click();
    }
  }, 1000);
}

function renderQuestions() {
  quizForm.innerHTML = '';
  questions.forEach((q, idx) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<p>${idx + 1}. ${q.question}</p>`;
    const ul = document.createElement('ul');
    ul.className = 'options';
    q.options.forEach((opt, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <label>
          <input type="radio" name="q${idx}" value="${i}" onclick="recordTime(${idx})"/> ${opt}
        </label>`;
      ul.appendChild(li);
    });
    quizForm.appendChild(div);
    quizForm.appendChild(ul);
  });
  questionStartTime = Date.now();
}

function recordTime(idx) {
  const now = Date.now();
  if (questionStartTime) {
    questionTimes[idx] += (now - questionStartTime) / 1000;
  }
  questionStartTime = now;
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  renderQuestions();
  startTimer();
});

submitBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  const now = Date.now();
  if (questionStartTime) {
    questionTimes[currentQuestionIndex] += (now - questionStartTime) / 1000;
  }

  let correctCount = 0;
  let maxTimeIdx = 0;
  const details = [];

  questions.forEach((q, idx) => {
    const selected = +document.querySelector(`input[name=q${idx}]:checked`)?.value;
    const isCorrect = selected === q.answer;
    if (isCorrect) correctCount++;
    details.push({ idx: idx + 1, time: questionTimes[idx].toFixed(2), correct: isCorrect });
    if (questionTimes[idx] > questionTimes[maxTimeIdx]) maxTimeIdx = idx;
  });

  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';
  resultScreen.innerHTML = `
    <h2>Results</h2>
    <p class="result-item">Score: ${correctCount} / ${questions.length}</p>
    <p class="result-item">Total Time: ${(600 - countdownTime).toFixed(2)}s</p>
    <p class="result-item">Average Time per Q: ${((600 - countdownTime) / questions.length).toFixed(2)}s</p>
    <p class="result-item">Most Time on Q#: ${maxTimeIdx + 1}</p>
    <h3>Details:</h3>
    <ul>
      ${details.map(d => `<li>Q${d.idx}: ${d.time}s — ${d.correct ? 'Correct' : 'Wrong'}</li>`).join('')}
    </ul>
  `;
});
