const questions = [
  { question: "What is the capital of France?", options: ["Berlin","Paris","Madrid","Rome"], answer: 1 },
  { question: "2 + 2 equals?",               options: ["3","4","5","6"],         answer: 1 }
];

let timerInterval, questionStartTime;
const questionTimes = Array(questions.length).fill(0);
let countdownTime = 600;  // 10 minutes

const startBtn      = document.getElementById('start-btn');
const startScreen   = document.getElementById('start-screen');
const quizScreen    = document.getElementById('quiz-screen');
const quizForm      = document.getElementById('quiz-form');
const submitBtn     = document.getElementById('submit-btn');
const resultScreen  = document.getElementById('result-screen');
const resultsWrapper= document.getElementById('results-wrapper');
const timeEl        = document.getElementById('time');

function formatTime(sec) {
  return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
}

function startTimer() {
  timeEl.textContent = formatTime(countdownTime);
  timerInterval = setInterval(() => {
    countdownTime--;
    timeEl.textContent = formatTime(countdownTime);
    if (countdownTime <= 60) timeEl.classList.add('flash');
    if (countdownTime <= 0) {
      clearInterval(timerInterval);
      submitBtn.disabled = true;
      alert("Time's up! Submitting...");
      submitBtn.click();
    }
  }, 1000);
}

function renderQuestions() {
  quizForm.innerHTML = '';
  questions.forEach((q, idx) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<p>${idx+1}. ${q.question}</p>`;
    const ul = document.createElement('ul');
    ul.className = 'options';
    q.options.forEach((opt,i) => {
      const li = document.createElement('li');
      li.innerHTML = `<label><input type="radio" name="q${idx}" value="${i}" onclick="recordTime(${idx})"/> ${opt}</label>`;
      ul.appendChild(li);
    });
    quizForm.appendChild(div);
    quizForm.appendChild(ul);
  });
  questionStartTime = Date.now();
}

function recordTime(idx) {
  const now = Date.now();
  questionTimes[idx] += (now - questionStartTime) / 1000;
  questionStartTime = now;
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizScreen.style.display  = 'block';
  renderQuestions();
  startTimer();
});

submitBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  const now = Date.now();
  questionTimes.forEach((_, i) => {
    // finalize time for any question that’s been started
    if (i === questions.length - 1 && questionStartTime) {
      questionTimes[i] += (now - questionStartTime) / 1000;
    }
  });

  let totalScore = 0;
  const maxScore = questions.length * 4;
  const stats    = { correct: 0, wrong: 0, unattempt: 0 };

  const details = questions.map((q, idx) => {
    const sel = document.querySelector(`input[name=q${idx}]:checked`);
    const val = sel ? +sel.value : null;
    let status, pts;
    if      (val === q.answer) { status = 'correct';   pts =  4; stats.correct++;   }
    else if (val === null)     { status = 'unattempt'; pts =  0; stats.unattempt++; }
    else                       { status = 'wrong';     pts = -1; stats.wrong++;     }
    totalScore += pts;
    return { idx: idx+1, time: questionTimes[idx].toFixed(2), status, pts };
  });

  // render results
  resultsWrapper.innerHTML = `
    <h2>Your Score</h2>
    <div id="score-display">0 / ${maxScore}</div>
    <p class="result-item">Right: ${stats.correct}</p>
    <p class="result-item">Wrong: ${stats.wrong}</p>
    <p class="result-item">Unattempted: ${stats.unattempt}</p>
    <h3>Details:</h3>
    <ul>
      ${details.map(d => `
        <li class="${d.status}">
          <span>Q${d.idx}: ${d.time}s</span>
          <span>${d.status === 'unattempt' ? 'Unattempted' : d.status.charAt(0).toUpperCase()+d.status.slice(1)}</span>
          <strong>${d.pts>0? '+'+d.pts : d.pts}</strong>
        </li>`).join('')}
    </ul>
  `;
  quizScreen.style.display  = 'none';
  resultScreen.style.display= 'block';

  // animate score count-up
  const display = document.getElementById('score-display');
  let cur = 0;
  (function step() {
    if (cur < totalScore) {
      cur++;
      display.textContent = `${cur} / ${maxScore}`;
      requestAnimationFrame(step);
    } else {
      display.textContent = `${totalScore} / ${maxScore}`;
    }
  })();
});
        
