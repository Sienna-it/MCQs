
let timerInterval;
let lastInteractionTime = null;
const questionTimes = Array(questions.length).fill(0);
const totalTime = questions.length * 60;
let countdownTime = totalTime;

const startBtn       = document.getElementById('start-btn');
const startScreen    = document.getElementById('start-screen');
const quizScreen     = document.getElementById('quiz-screen');
const quizForm       = document.getElementById('quiz-form');
const submitBtn      = document.getElementById('submit-btn');
const resultScreen   = document.getElementById('result-screen');
const resultsWrapper = document.getElementById('results-wrapper');
const timeEl         = document.getElementById('time');

function formatTime(sec) {
  return `${String(Math.floor(sec / 60)).padStart(2,'0')}:${String(sec % 60).padStart(2,'0')}`;
}

function startTimer() {
  timeEl.textContent = formatTime(countdownTime);
  timerInterval = setInterval(() => {
    countdownTime--;
    timeEl.textContent = formatTime(countdownTime);
    if (countdownTime <= totalTime / 10) timeEl.classList.add('flash');
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
    const block = document.createElement('div');
    block.className = 'question-block';

    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `<p>${idx + 1}. ${q.question}</p>`;

    const ul = document.createElement('ul');
    ul.className = 'options';

    q.options.forEach((opt, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <label>
          <input type="radio" name="q${idx}" value="${i}" />
          ${opt}
        </label>`;
      li.querySelector('input').addEventListener('change', () => recordTime(idx));
      ul.appendChild(li);
    });

    block.appendChild(div);
    block.appendChild(ul);
    quizForm.appendChild(block);
  });
}

function recordTime(idx) {
  const now = Date.now();
  if (lastInteractionTime !== null) {
    questionTimes[idx] += (now - lastInteractionTime) / 1000;
  }
  lastInteractionTime = now;
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizScreen.style.display  = 'block';
  renderQuestions();
  startTimer();
  lastInteractionTime = Date.now();
});

submitBtn.addEventListener('click', () => {
  clearInterval(timerInterval);

  let totalScore = 0;
  const marksAward = 5;
  const maxScore = questions.length * marksAward;
  const stats = { correct: 0, wrong: 0, unattempt: 0 };

  const details = questions.map((q, idx) => {
    const sel = document.querySelector(`input[name=q${idx}]:checked`);
    const val = sel ? +sel.value : null;
    let status, pts;
    if (val === q.answer) {
      status = 'correct'; pts = marksAward; stats.correct++;
    } else if (val === null) {
      status = 'unattempt'; pts = 0; stats.unattempt++;
    } else {
      status = 'wrong'; pts = -1; stats.wrong++;
    }
    totalScore += pts;
    return {
      idx: idx + 1,
      time: questionTimes[idx].toFixed(2),
      status,
      pts,
      question: q.question,
      correctText: q.options[q.answer]
    };
  });

  resultsWrapper.innerHTML = `
    <h2>Your Score</h2>
    <div id="score-display">0 / ${maxScore}</div>
    <p class="result-item">Right: ${stats.correct}</p>
    <p class="result-item">Wrong: ${stats.wrong}</p>
    <p class="result-item">Unattempted: ${stats.unattempt}</p>
    <h3>Details:</h3>
    <ul>
      ${details.map(d => {
        if (d.status === 'correct') {
          return `<li class="correct">
                    <span>Q${d.idx}: ${d.time}s — Correct (+${d.pts})</span>
                  </li>`;
        } else {
          const label = d.status === 'wrong' ? 'Wrong' : 'Unattempted';
          return `<li class="${d.status}">
                    <details>
                      <summary>Q${d.idx}: ${d.time}s — ${label} (${d.pts >= 0 ? '+' + d.pts : d.pts})</summary>
                      <p><strong>Question:</strong> ${d.question}</p>
                      <p><strong>Answer:</strong> ${d.correctText}</p>
                      ${d.status === 'wrong' && d.userAnswerText !== null ? `<p><strong>You Selected:</strong> ${d.userAnswerText}</p>` : ''}
                    </details>
                  </li>`;
        }
      }).join('')}
    </ul>
  `;

  quizScreen.style.display   = 'none';
  resultScreen.style.display = 'block';

  const display = document.getElementById('score-display');
  let cur = 0;
  (function step() {
    if (cur < totalScore) {
      cur += (totalScore / 300);
      display.textContent = `${Math.round(cur)} / ${maxScore}`;
      requestAnimationFrame(step);
    } else {
      display.textContent = `${totalScore} / ${maxScore}`;
    }
  })();
});
    
