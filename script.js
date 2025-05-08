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
    // finalize last question's time
    questionTimes[currentQuestionIndex] += (now - questionStartTime) / 1000;
  }

  let totalScore = 0;
  const maxScore   = questions.length * 4;
  let maxTimeIdx   = 0;
  const details    = [];

  questions.forEach((q, idx) => {
    const selInput = document.querySelector(`input[name=q${idx}]:checked`);
    let selected = selInput ? +selInput.value : null;
    let status, pts;

    if (selected === q.answer) {
      status = 'correct';
      pts = 4;
    } else if (selected === null) {
      status = 'unattempt';
      pts = 0;
    } else {
      status = 'wrong';
      pts = -1;
    }

    totalScore += pts;
    details.push({
      idx: idx + 1,
      time: questionTimes[idx].toFixed(2),
      status,
      pts
    });

    if (questionTimes[idx] > questionTimes[maxTimeIdx]) {
      maxTimeIdx = idx;
    }
  });

  // Build results markup
  const resList = details.map(d => 
    `<li class="${d.status}">
       <span>Q${d.idx}: ${d.time}s</span>
       <span>${d.status === 'unattempt' ? 'Unattempted' : (d.status === 'correct' ? 'Correct' : 'Wrong')}</span>
       <strong>${d.pts > 0 ? '+'+d.pts : d.pts}</strong>
     </li>`
  ).join('');

  // Insert into DOM
  quizScreen.style.display   = 'none';
  resultScreen.style.display = 'block';
  document.getElementById('results-wrapper').innerHTML = `
    <h2>Your Score</h2>
    <div id="score-display">0 / ${maxScore}</div>
    <p class="result-item">Questions: ${questions.length}</p>
    <p class="result-item">Most time on Q#: ${maxTimeIdx + 1}</p>
    <h3>Details:</h3>
    <ul>${resList}</ul>
  `;

  // Animate the score count-up
  const display = document.getElementById('score-display');
  let current = 0;
  const step = () => {
    if (current < totalScore) {
      current++;
      display.textContent = `${current} / ${maxScore}`;
      requestAnimationFrame(step);
    } else {
      display.textContent = `${totalScore} / ${maxScore}`;
    }
  };
  requestAnimationFrame(step);
});

