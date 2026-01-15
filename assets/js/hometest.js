// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

// ----------------------------
// FULL QUESTION POOL (Denmark – DK)
// ----------------------------
const INLINE_TEST_QUESTIONS = [
  {
    q: "Hvilken dansk konge indførte kristendommen i Danmark?",
    a: [
      "Harald Blåtand",
      "Magnus den Gode",
      "Gorm den Gamle"
    ],
    correct: 0
  },
  {
    q: "Hvad hedder farvandet mellem Jylland og Fyn?",
    a: [
      "Øresund",
      "Storebælt",
      "Lillebælt"
    ],
    correct: 2
  },
  {
    q: "Må man danne en forening, hvis man ikke er dansk statsborger?",
    a: [
      "Ja",
      "Nej"
    ],
    correct: 0
  },
  {
    q: "Hvem har ansvaret for de offentlige vuggestuer?",
    a: [
      "Kommunerne",
      "Regionerne",
      "Staten"
    ],
    correct: 0
  },
  {
    q: "Hvornår fik Danmark for første gang en kvindelig statsminister?",
    a: [
      "1991",
      "2001",
      "2011"
    ],
    correct: 2
  },

  {
    q: "Hvad hedder Danmarks nationaldag?",
    a: [
      "Grundlovsdag",
      "Valdemarsdag",
      "Store Bededag"
    ],
    correct: 0
  },
  {
    q: "Hvem vælger medlemmerne af Folketinget?",
    a: [
      "Borgerne",
      "Regeringen",
      "Dronningen"
    ],
    correct: 0
  },
  {
    q: "Hvor gammel skal man være for at stemme til folketingsvalg?",
    a: [
      "16 år",
      "18 år",
      "21 år"
    ],
    correct: 1
  },
  {
    q: "Hvilket organ laver lovene i Danmark?",
    a: [
      "Folketinget",
      "Højesteret",
      "Regeringen"
    ],
    correct: 0
  },
  {
    q: "Hvad står politiet for i Danmark?",
    a: [
      "At opretholde lov og orden",
      "At lave domme",
      "At skrive love"
    ],
    correct: 0
  },

  {
    q: "Hvilken styreform har Danmark?",
    a: [
      "Konstitutionelt monarki",
      "Præsidentstyre",
      "Militærstyre"
    ],
    correct: 0
  },
  {
    q: "Hvem er Danmarks statsoverhoved?",
    a: [
      "Monarken",
      "Statsministeren",
      "Folketingets formand"
    ],
    correct: 0
  },
  {
    q: "Hvad er CPR-nummeret et eksempel på?",
    a: [
      "Et personligt identifikationsnummer",
      "Et skattenummer",
      "Et medlemsnummer i sundhedsvæsenet"
    ],
    correct: 0
  },
  {
    q: "Hvem har ansvaret for hospitalerne i Danmark?",
    a: [
      "Regionerne",
      "Kommunerne",
      "Staten"
    ],
    correct: 0
  },
  {
    q: "Hvad er Danmarks officielle sprog?",
    a: [
      "Dansk",
      "Tysk",
      "Engelsk"
    ],
    correct: 0
  },

  {
    q: "Hvad betyder ytringsfrihed?",
    a: [
      "At man frit kan udtrykke sin mening",
      "At man kan sige alt uden konsekvenser",
      "At kun staten må udtrykke sig"
    ],
    correct: 0
  },
  {
    q: "Hvad er Danmarks højeste domstol?",
    a: [
      "Højesteret",
      "Landsretten",
      "Byretten"
    ],
    correct: 0
  },
  {
    q: "Hvem fastlægger strafferammen for lovovertrædelser?",
    a: [
      "Folketinget",
      "Domstolene",
      "Politiet"
    ],
    correct: 0
  },
  {
    q: "Hvad kaldes Danmarks grundlov?",
    a: [
      "Grundloven",
      "Statsbogen",
      "Folkebogen"
    ],
    correct: 0
  },
  {
    q: "Hvem leder regeringen i Danmark?",
    a: [
      "Statsministeren",
      "Dronningen",
      "Justitsministeren"
    ],
    correct: 0
  }
];

// ----------------------------
// STATE
// ----------------------------
let correctCount = 0;
let wrongCount = 0;
let answeredCount = 0;
let totalQuestions = INLINE_TEST_QUESTIONS.length;

let currentRow = 0;

// ----------------------------
// UI TARGETS
// ----------------------------
const container = document.getElementById("inline-test-questions");
const expandBtn = document.getElementById("inline-test-expand");

// ----------------------------
// PROGRESS DISPLAY
// ----------------------------
function updateProgressDisplay() {
  document.getElementById("inline-progress-text").textContent =
    `Fremskridt: ${answeredCount} / ${totalQuestions} spørgsmål`;
}

function updateProgressBar() {
  const pct = (answeredCount / totalQuestions) * 100;
  document.getElementById("inline-progressbar").style.width = pct + "%";
}

// ----------------------------
// UTILITIES
// ----------------------------
function shuffleAnswers(question) {
  const combined = question.a.map((opt, index) => ({
    text: opt,
    isCorrect: index === question.correct
  }));

  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  question.a = combined.map(i => i.text);
  question.correct = combined.findIndex(i => i.isCorrect);
}

function createDonutChart() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const C = 2 * Math.PI * 40;

  return `
    <div class="donut-wrapper">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#ebe6ff" stroke-width="12" fill="none"></circle>
        <circle cx="50" cy="50" r="40" stroke="#6d4aff" stroke-width="12" fill="none"
          stroke-dasharray="${(pct / 100) * C} ${(1 - pct / 100) * C}"
          transform="rotate(-90 50 50)" stroke-linecap="round"></circle>
      </svg>
      <div class="donut-center">${pct}%</div>
    </div>
  `;
}

function createEndCard() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const card = document.createElement("div");
  card.className = "inline-question-card end-card";

  const title =
    pct >= 80 ? "Fremragende arbejde!" :
    pct >= 50 ? "Rigtig godt!" :
    pct >= 25 ? "God begyndelse!" :
    "Fortsæt træningen";

  card.innerHTML = `
    <h3>${title}</h3>
    ${createDonutChart()}
    <p>Du har gennemført de gratis spørgsmål.  
    Få adgang til <strong>hundredvis af officielle spørgsmål</strong>, fulde simulationer og detaljerede forklaringer.</p>
    <a href="https://civiclearn.com/denmark-pr/checkout.html" class="hero-primary-btn">Få fuld adgang</a>
  `;

  return card;
}

// ----------------------------
// BUILD ROWS
// ----------------------------
const rows = [];
for (let i = 0; i < totalQuestions; i += QUESTIONS_PER_ROW) {
  rows.push(INLINE_TEST_QUESTIONS.slice(i, i + QUESTIONS_PER_ROW));
}

INLINE_TEST_QUESTIONS.forEach(q => shuffleAnswers(q));

// ----------------------------
// RENDERING
// ----------------------------
function renderRow(rowIndex) {
  if (!rows[rowIndex]) return;

  rows[rowIndex].forEach((q, offset) => {
    const absoluteIndex = rowIndex * QUESTIONS_PER_ROW + offset;
    container.appendChild(createQuestionCard(q, absoluteIndex));
  });
}

function createQuestionCard(questionObj, absoluteIndex) {
  const card = document.createElement("div");
  card.className = "inline-question-card";

  const title = document.createElement("h3");
  title.textContent = questionObj.q;

  const feedback = document.createElement("div");
  feedback.className = "inline-feedback";

  card.append(title);

  questionObj.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "inline-option-btn";
    btn.textContent = opt;

    btn.onclick = () => {
      answeredCount++;
      updateProgressDisplay();
      updateProgressBar();

      if (i === questionObj.correct) {
        correctCount++;
        feedback.textContent = "Korrekt!";
        feedback.classList.add("inline-correct");
      } else {
        wrongCount++;
        feedback.textContent =
          "Korrekt svar: " + questionObj.a[questionObj.correct];
        feedback.classList.add("inline-wrong");
      }

      card.querySelectorAll("button").forEach(b => (b.disabled = true));
      card.appendChild(feedback);

      const isLastQuestion = absoluteIndex === totalQuestions - 1;

      if (isLastQuestion) {
        setTimeout(() => container.appendChild(createEndCard()), 300);
      }

      const isLastInRow =
        (absoluteIndex + 1) % QUESTIONS_PER_ROW === 0 &&
        absoluteIndex !== totalQuestions - 1;

      if (isLastInRow) {
        currentRow++;
        renderRow(currentRow);
      }
    };

    card.appendChild(btn);
  });

  return card;
}

// ----------------------------
// INITIAL RENDER
// ----------------------------
renderRow(0);
updateProgressDisplay();
updateProgressBar();

// ----------------------------
// CONTINUE BUTTON
// ----------------------------
expandBtn.onclick = () => {
  currentRow = 1;
  renderRow(currentRow);
  expandBtn.style.display = "none";
};
