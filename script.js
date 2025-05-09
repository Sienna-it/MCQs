const questions = [
  // Logical & Reasoning (CUET GAT PYQs)
  {
    question: "At which of the following places is the weight of an object maximum?",
    options: ["Equator", "Poles", "Tropic of Cancer", "Tropic of Capricorn"],
    answer: 1  // Poles :contentReference[oaicite:3]{index=3}
  },
  {
    question: "A man walks 5 km south, turns right and walks 3 km, then turns left and walks 5 km. In which direction is he from the starting point?",
    options: ["West", "South", "North-East", "South-West"],
    answer: 3  // South-West :contentReference[oaicite:4]{index=4}
  },
  {
    question: "Which of the following cannot be a measure of an angle of a cyclic quadrilateral?",
    options: ["90°", "150°", "170°", "180°"],
    answer: 3  // 180° :contentReference[oaicite:5]{index=5}
  },
  {
    question: "If the word ‘BOY’ is coded as ‘DQA’, how is ‘CAT’ coded?",
    options: ["ECV", "EDU", "FBS", "ECT"],
    answer: 0  // ECV :contentReference[oaicite:6]{index=6}
  },
  {
    question: "Find the next number in the series: 8, 16, 32, 64, __.",
    options: ["112", "128", "144", "160"],
    answer: 1  // 128 :contentReference[oaicite:7]{index=7}
  },

  // General Test (CUET GAT PYQs)
  {
    question: "6 : 1 is the ratio of Amar’s age to Ajay’s age. After 7 years, this ratio becomes 7 : 2. What is Ajay’s present age (in years)?",
    options: ["9", "7", "5", "11"],
    answer: 1  // 7 years :contentReference[oaicite:8]{index=8}
  },
  {
    question: "Which of the following is NOT a state of India?",
    options: ["Manipur", "Ladakh", "Uttar Pradesh", "Gujarat"],
    answer: 1  // Ladakh :contentReference[oaicite:9]{index=9}
  },
  {
    question: "Who was the first Governor-General of independent India?",
    options: ["Dr. Sarvepalli Radhakrishnan", "Dr. Rajendra Prasad", "Lord Mountbatten", "Lord William Bentinck"],
    answer: 2  // Lord Mountbatten :contentReference[oaicite:10]{index=10}
  },

  // Quantitative Aptitude (CUET QA PYQs)
  {
    question: "A town had a population of 20,000 in 1980. By 1981, it increased by 25%. In 1982, it decreased by 20%. In 1983, it increased by 30%. What was its population at the end of 1983?",
    options: ["28,000", "24,000", "26,000", "25,000"],
    answer: 2  // 26,000 :contentReference[oaicite:11]{index=11}
  }
];



let timerInterval;
let lastInteractionTime = null;
let lastIdx = null;                                // which question was being “worked on”
const questionTimes = Array(questions.length).fill(0);
const totalTime = (questions.length * 60)
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
  return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`;
}

function startTimer() {
  timeEl.textContent = formatTime(countdownTime);
  timerInterval = setInterval(() => {
    countdownTime--;
    timeEl.textContent = formatTime(countdownTime);
    if (countdownTime <= (totalTime / 10)) timeEl.classList.add('flash');
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
      // when user selects an answer, record time delta
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
  if (lastInteractionTime !== null && lastIdx !== null) {
    // add elapsed seconds to whichever question was “active” before this click
    questionTimes[lastIdx] += (now - lastInteractionTime) / 1000;
  }
  lastInteractionTime = now;  // reset the clock
  lastIdx = idx;             // mark this question as now “active”
}

startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  quizScreen.style.display  = 'block';
  renderQuestions();
  startTimer();
  lastInteractionTime = Date.now();  // start tracking
});

submitBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  const now = Date.now();
  // final delta for the last question they were on
  if (lastInteractionTime !== null && lastIdx !== null) {
    questionTimes[lastIdx] += (now - lastInteractionTime) / 1000;
  }

  let totalScore = 0;
  const marksAward = 5;
  const maxScore = questions.length * marksAward;
  const stats    = { correct: 0, wrong: 0, unattempt: 0 };

  const details = questions.map((q, idx) => {
    const sel = document.querySelector(`input[name=q${idx}]:checked`);
    const val = sel ? +sel.value : null;
    let status, pts;
    if      (val === q.answer) { status = 'correct';   pts =  5; stats.correct++;   }
    else if (val === null)     { status = 'unattempt'; pts =  0; stats.unattempt++; }
    else                       { status = 'wrong';     pts = -1; stats.wrong++;     }
    totalScore += pts;
    return {
      idx: idx + 1,
      time: questionTimes[idx].toFixed(2),
      status,
      pts
    };
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
          <span>${d.status === 'unattempt'
            ? 'Unattempted'
            : d.status.charAt(0).toUpperCase() + d.status.slice(1)
          }</span>
          <strong>${d.pts > 0 ? '+' + d.pts : d.pts}</strong>
        </li>`).join('')}
    </ul>
  `;
  quizScreen.style.display   = 'none';
  resultScreen.style.display = 'block';

  // animate score count-up
  const display = document.getElementById('score-display');
  let cur = 0;
  (function step() {
    if (cur < totalScore) {
      cur+= (totalScore / 300)
      display.textContent = `${Math.round(cur)} / ${maxScore}`;
      requestAnimationFrame(step);
    } else {
      display.textContent = `${totalScore} / ${maxScore}`;
    }
  })();
});
                              
