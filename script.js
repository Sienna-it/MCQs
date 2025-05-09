const questions = [
  {
    question: "Who discovered the electron?",
    options: ["Marie Curie", "J.J. Thomson", "Ernest Rutherford", "Niels Bohr"],
    answer: 1
  },
  {
    question: "Due to ocean acidification, the pH of surface ocean water has decreased by about what amount since the Industrial Revolution?",
    options: ["0.01", "0.1", "1.0", "10.0"],
    answer: 1
  },
  {
    question: "Which of the following is NOT a part of the Quantitative Aptitude section of CUET?",
    options: ["Number Systems", "Series Completion", "Coding–Decoding", "Logarithms"],
    answer: 2
  },
  {
    question: "The distance between two points (2,3) and (−1,−1) in the Cartesian plane is:",
    options: ["5", "√20", "√13", "7"],
    answer: 2
  },
  {
    question: "Which constitutional amendment introduced the Right to Education in India?",
    options: ["73rd", "86th", "91st", "93rd"],
    answer: 1
  },
  {
    question: "In logical reasoning, if all roses are flowers and some flowers fade quickly, we can conclude that:",
    options: [
      "All roses fade quickly",
      "Some roses may fade quickly",
      "No rose fades quickly",
      "All flowers are roses"
    ],
    answer: 1
  },
  {
    question: "The G20 summit in 2024 was hosted by which country?",
    options: ["Italy", "India", "Brazil", "Japan"],
    answer: 1
  },
  {
    question: "The compound interest on a principal of ₹1,000 at 10% per annum compounded annually for 2 years is:",
    options: ["₹210", "₹100", "₹110", "₹120"],
    answer: 0
  },
  {
    question: "Which planet has the longest day (rotation period) in our solar system?",
    options: ["Venus", "Mercury", "Jupiter", "Saturn"],
    answer: 0
  },
  {
    question: "Who is the author of the play ‘Hamlet’?",
    options: ["Christopher Marlowe", "Ben Jonson", "William Shakespeare", "John Webster"],
    answer: 2
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
      display.textContent = `${cur} / ${maxScore}`;
      requestAnimationFrame(step);
    } else {
      display.textContent = `${totalScore} / ${maxScore}`;
    }
  })();
});
                              
