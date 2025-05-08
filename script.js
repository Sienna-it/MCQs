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
  },
  // Add or remove question objects
];

let startTime, timerInterval;

const userTimes = [];
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const quizForm = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const resultScreen = document.getElementById('result-screen');
const timeEl = document.getElementById('time');

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const diff = Date.now() - startTime;
    const mins = String(Math.floor(diff / 60000)).padStart(2, '0');
    const secs = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
    timeEl.textContent = `${mins}:${secs}`;
  }, 500);
}

function stopTimer() {
  clearInterval(timerInterval);
  const total = Date.now() - startTime;
  return total / 1000;
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
          <input type="radio" name="q${idx}" value="${i}" /> ${opt}
        </label>`;
      ul.appendChild(li);
    });
    quizForm.appendChild(div);
    quizForm.appendChild(ul);
  });
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  renderQuestions();
  startTimer();
});

submitBtn.addEventListener('click', () => {
  const totalTime = stopTimer();
  const timesPerQ = totalTime / questions.length;
  let correctCount = 0;
  let maxTimeIdx = 0;
  const details = [];

  questions.forEach((q, idx) => {
    const selected = +document.querySelector(`input[name=q${idx}]:checked`)?.value;
    const isCorrect = selected === q.answer;
    if (isCorrect) correctCount++;
    details.push({ idx: idx + 1, time: timesPerQ.toFixed(2), correct: isCorrect });
    if (timesPerQ > (details[maxTimeIdx]?.time || 0)) maxTimeIdx = idx;
  });

  quizScreen.style.display = 'none';
  resultScreen.style.display = 'block';
  resultScreen.innerHTML = `
    <h2>Results</h2>
    <p class="result-item">Score: ${correctCount} / ${questions.length}</p>
    <p class="result-item">Total Time: ${totalTime.toFixed(2)}s</p>
    <p class="result-item">Average Time per Q: ${timesPerQ.toFixed(2)}s</p>
    <p class="result-item">Longest on Q#: ${maxTimeIdx + 1}</p>
    <h3>Details:</h3>
    <ul>
      ${details.map(d => `<li>Q${d.idx}: ${d.time}s — ${d.correct ? 'Correct' : 'Wrong'}</li>`).join('')}
    </ul>
  `;
});
                                   
