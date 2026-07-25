/* ==================================================================
   BIRTHDAY PUZZLE HUNT
   ------------------------------------------------------------------
   ↓↓↓ EDIT EVERYTHING PERSONAL BELOW. The logic never needs touching. ↓↓↓
   ================================================================== */

/* Landing + final screen copy (edit freely). */
const messages = {
  // Shown on the very last screen after all puzzles are solved.
  final:
    "C'était la dernière. 💛\n\n" +
    "Chaque indice te rapprochait un peu plus de tout ce que tu représentes pour moi. " +
    "J'espère que cette journée a été aussi spéciale que toi.\n\n" +
    "Joyeux anniversaire, mon amour.",
};

/* ------------------------------------------------------------------
   PUZZLES
   Each puzzle object supports:
     id        : unique number
     type      : "text" | "choice" | "number" | "wordle" | "image"
     title     : short heading
     question  : the clue (supports line breaks with \n)
     answer    : correct answer
                 - text   -> string (matched case/accent-insensitive, trimmed)
                            can also be an array of accepted strings
                 - number -> number
                 - choice -> the exact string of the correct option
                 - wordle -> the word to guess (letters only, accents ignored)
                 - image  -> the `value` of the correct option
     options   : array of strings (type "choice") OR
                 array of { src, value } objects (type "image")
     giftLabel : shown in the success message, e.g. "Gift #1"
     success   : (optional) custom success message; overrides the default
------------------------------------------------------------------ */
const puzzles = [
  {
    id: 1,
    type: "wordle",
    title: "Le mot mystère",
    question:
      "Devine le mot \n(Vert = bien placé, jaune = mal placé, gris = absent.)",
    answer: "ABRICOT",
    giftLabel: "Cadeau n°1",
  },
  {
    id: 2,
    type: "wordle",
    title: "Le mot mystère",
    question:
      "Devine le mot de 12 lettres.\n(Vert = bien placé, jaune = mal placé, gris = absent.)",
    answer: "DISSOCIATION",
    giftLabel: "Cadeau n°2",
  },
  {
    id: 3,
    type: "image",
    title: "Remonte le temps",
    question: "Parmi ces photos de nous, laquelle est la plus ancienne ?",
    options: [
      { src: "photos/photo-1.jpg", value: "1" },
      { src: "photos/photo-2.jpg", value: "2" },
      { src: "photos/photo-3.jpg", value: "3" },
      { src: "photos/photo-4.jpg", value: "4" },
    ],
    answer: "1",
    giftLabel: "Cadeau n°3",
  },
  {
    id: 4,
    type: "choice",
    title: "Le secret d'une bonne nuit",
    question: "Selon les experts, quel est LE meilleur réflexe avant de dormir ?",
    options: [
      "Virer Abricot de la chambre",
      "S'enfiler un euphytose nuit",
      "Éteindre les écrans et lire un peu",
      "Regarder Widow's Bay",
    ],
    answer: "Éteindre les écrans et lire un peu",
    giftLabel: "Cadeau n°4",
    success: "🎁 Va chercher le Cadeau n°4 — de quoi faire de beaux rêves. 😴📖",
  },
  {
    id: 5,
    type: "text",
    title: "Mélange parfumé",
    question:
      "Remets les lettres dans l'ordre pour trouver ta prochaine récompense :\n\n« L A S U R I T »\n(7 lettres… ça sent bon les mains propres 😏)",
    answer: ["rituals", "ritual"],
    giftLabel: "Cadeau n°5",
    success: "🎁 Direction le lavabo — ton cadeau y mousse déjà. 🧼",
  },
];

/* ==================================================================
   ↑↑↑ END OF EDITABLE CONTENT ↑↑↑
   Logic below — no need to change anything past this line.
   ================================================================== */

const STORAGE_KEY = "birthday-hunt-progress-v1";

const state = {
  index: 0, // index of the puzzle currently being worked on
};

/* ----- Element references ----- */
const screens = {
  landing: document.getElementById("screen-landing"),
  puzzle: document.getElementById("screen-puzzle"),
  final: document.getElementById("screen-final"),
};

const el = {
  start: document.getElementById("btn-start"),
  resumeNote: document.getElementById("resume-note"),
  progressBar: document.getElementById("progress-bar"),
  progressLabel: document.getElementById("progress-label"),
  puzzleCard: document.getElementById("puzzle-card"),
  puzzleIndex: document.getElementById("puzzle-index"),
  puzzleTitle: document.getElementById("puzzle-title"),
  puzzleQuestion: document.getElementById("puzzle-question"),
  form: document.getElementById("puzzle-form"),
  inputArea: document.getElementById("puzzle-input-area"),
  checkBtn: document.getElementById("btn-check"),
  feedback: document.getElementById("feedback"),
  successCard: document.getElementById("success-card"),
  successMessage: document.getElementById("success-message"),
  nextBtn: document.getElementById("btn-next"),
  finalMessage: document.getElementById("final-message"),
  replayBtn: document.getElementById("btn-replay"),
  resetLink: document.getElementById("reset-link"),
  confetti: document.getElementById("confetti"),
};

/* ----- Persistence ----- */
function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    const idx = Number(parsed.index);
    if (Number.isInteger(idx) && idx >= 0 && idx <= puzzles.length) {
      return idx;
    }
  } catch (_) {
    /* ignore corrupt storage */
  }
  return 0;
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ index: state.index }));
  } catch (_) {
    /* storage may be unavailable (private mode) — game still works */
  }
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {}
}

/* ----- Screen switching ----- */
function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("screen--active"));
  screens[name].classList.add("screen--active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ----- Answer normalisation ----- */
function normalize(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/\s+/g, " ");
}

function isCorrect(puzzle, rawValue) {
  if (puzzle.type === "number") {
    const num = parseFloat(String(rawValue).replace(",", "."));
    return !Number.isNaN(num) && num === Number(puzzle.answer);
  }
  // text or choice
  const given = normalize(rawValue);
  const accepted = Array.isArray(puzzle.answer) ? puzzle.answer : [puzzle.answer];
  return accepted.some((a) => normalize(a) === given);
}

/* ----- Wordle helpers ----- */
let activeKeyHandler = null;

function detachKeyHandler() {
  if (activeKeyHandler) {
    document.removeEventListener("keydown", activeKeyHandler);
    activeKeyHandler = null;
  }
}

// Keep only A-Z, uppercase, strip accents.
function toLetters(str) {
  return String(str)
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z]/g, "");
}

// Classic Wordle scoring with correct handling of duplicate letters.
function scoreGuess(guessArr, answerArr) {
  const res = new Array(guessArr.length).fill("absent");
  const counts = {};
  answerArr.forEach((ch) => {
    counts[ch] = (counts[ch] || 0) + 1;
  });
  guessArr.forEach((ch, i) => {
    if (ch === answerArr[i]) {
      res[i] = "correct";
      counts[ch]--;
    }
  });
  guessArr.forEach((ch, i) => {
    if (res[i] === "correct") return;
    if (counts[ch] > 0) {
      res[i] = "present";
      counts[ch]--;
    }
  });
  return res;
}

function renderWordle(puzzle) {
  const answerArr = toLetters(puzzle.answer).split("");
  const answer = answerArr.join("");
  const len = answerArr.length;
  el.form.classList.add("is-wordle");

  const wState = { guesses: [], current: "", done: false };
  const keyStatus = {}; // letter -> best status seen so far
  const rank = (s) => (s === "correct" ? 3 : s === "present" ? 2 : s === "absent" ? 1 : 0);

  const board = document.createElement("div");
  board.className = "wordle-board";
  const keyboard = document.createElement("div");
  keyboard.className = "wordle-keyboard";

  function renderBoard() {
    board.innerHTML = "";
    const rows = wState.guesses.length + (wState.done ? 0 : 1);
    for (let r = 0; r < rows; r++) {
      const row = document.createElement("div");
      row.className = "wordle-row";
      const guess = wState.guesses[r];
      const isActive = !wState.done && r === wState.guesses.length;
      for (let c = 0; c < len; c++) {
        const tile = document.createElement("div");
        tile.className = "wordle-tile";
        if (guess) {
          tile.textContent = guess.letters[c];
          tile.classList.add("is-" + guess.scores[c]);
        } else if (isActive) {
          const ch = wState.current[c] || "";
          tile.textContent = ch;
          if (ch) tile.classList.add("is-filled");
        }
        row.appendChild(tile);
      }
      board.appendChild(row);
    }
  }

  function renderKeyboard() {
    keyboard.innerHTML = "";
    const layout = [
      ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["Q", "S", "D", "F", "G", "H", "J", "K", "L", "M"],
      ["ENTER", "W", "X", "C", "V", "B", "N", "DEL"],
    ];
    layout.forEach((rowKeys) => {
      const krow = document.createElement("div");
      krow.className = "wordle-krow";
      rowKeys.forEach((k) => {
        const key = document.createElement("button");
        key.type = "button";
        key.className = "wordle-key";
        if (k === "ENTER" || k === "DEL") key.classList.add("wordle-key--wide");
        key.textContent = k === "DEL" ? "⌫" : k === "ENTER" ? "Entrée" : k;
        if (keyStatus[k]) key.classList.add("is-" + keyStatus[k]);
        key.addEventListener("click", () => handleKey(k));
        krow.appendChild(key);
      });
      keyboard.appendChild(krow);
    });
  }

  function handleKey(k) {
    if (wState.done) return;
    if (k === "ENTER") return submitGuess();
    if (k === "DEL") {
      wState.current = wState.current.slice(0, -1);
      renderBoard();
      return;
    }
    if (/^[A-Z]$/.test(k) && wState.current.length < len) {
      wState.current += k;
      renderBoard();
    }
  }

  function submitGuess() {
    if (wState.current.length < len) {
      nudge("Il manque des lettres 💭");
      return;
    }
    const letters = wState.current.split("");
    const scores = scoreGuess(letters, answerArr);
    wState.guesses.push({ letters, scores });
    letters.forEach((ch, i) => {
      if (rank(scores[i]) > rank(keyStatus[ch])) keyStatus[ch] = scores[i];
    });
    const win = wState.current === answer;
    wState.current = "";
    if (win) wState.done = true;
    renderBoard();
    renderKeyboard();
    if (win) {
      detachKeyHandler();
      onCorrect(puzzle);
    } else {
      el.feedback.textContent = "";
      el.feedback.className = "feedback";
    }
  }

  // Physical keyboard support (handy for desktop testing).
  detachKeyHandler();
  activeKeyHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleKey("ENTER");
    } else if (e.key === "Backspace") {
      handleKey("DEL");
    } else {
      const up = toLetters(e.key);
      if (up.length === 1) handleKey(up);
    }
  };
  document.addEventListener("keydown", activeKeyHandler);

  renderBoard();
  renderKeyboard();
  el.inputArea.appendChild(board);
  el.inputArea.appendChild(keyboard);
}

/* ----- Rendering a puzzle ----- */
function renderPuzzle() {
  detachKeyHandler();
  const puzzle = puzzles[state.index];
  if (!puzzle) {
    finish();
    return;
  }

  // Progress
  const total = puzzles.length;
  const done = state.index;
  el.progressBar.style.width = `${(done / total) * 100}%`;
  el.progressLabel.textContent = `Énigme ${state.index + 1} sur ${total}`;

  // Content
  el.puzzleIndex.textContent = `Énigme ${state.index + 1}`;
  el.puzzleTitle.textContent = puzzle.title;
  el.puzzleQuestion.textContent = puzzle.question;

  // Reset feedback + cards
  el.feedback.textContent = "";
  el.feedback.className = "feedback";
  el.successCard.hidden = true;
  el.puzzleCard.hidden = false;

  // Build the input area based on type
  el.inputArea.innerHTML = "";
  el.form.classList.remove("is-choice", "is-wordle");

  if (puzzle.type === "wordle") {
    renderWordle(puzzle);
  } else if (puzzle.type === "image") {
    el.form.classList.add("is-choice");
    const grid = document.createElement("div");
    grid.className = "image-grid";
    puzzle.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "image-choice";
      const img = document.createElement("img");
      img.src = opt.src;
      img.alt = "";
      img.loading = "lazy";
      btn.appendChild(img);
      btn.addEventListener("click", () => handleChoice(puzzle, opt.value, btn, grid));
      grid.appendChild(btn);
    });
    el.inputArea.appendChild(grid);
  } else if (puzzle.type === "choice") {
    el.form.classList.add("is-choice");
    const grid = document.createElement("div");
    grid.className = "choice-grid";
    puzzle.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleChoice(puzzle, opt, btn, grid));
      grid.appendChild(btn);
    });
    el.inputArea.appendChild(grid);
  } else {
    const input = document.createElement("input");
    input.id = "answer-input";
    if (puzzle.type === "number") {
      input.type = "number";
      input.inputMode = "decimal";
      input.className = "number-input";
      input.placeholder = "Entre un nombre";
    } else {
      input.type = "text";
      input.className = "text-input";
      input.placeholder = "Écris ta réponse";
      input.autocapitalize = "off";
      input.autocomplete = "off";
      input.spellcheck = false;
    }
    el.inputArea.appendChild(input);
    // Focus for convenience (skipped on touch to avoid keyboard jumping)
    if (!("ontouchstart" in window)) {
      setTimeout(() => input.focus(), 60);
    }
  }
}

/* ----- Handling answers ----- */
function handleTextSubmit(e) {
  e.preventDefault();
  const puzzle = puzzles[state.index];
  if (!puzzle || puzzle.type === "choice" || puzzle.type === "wordle") return;
  const input = document.getElementById("answer-input");
  if (!input) return;
  const value = input.value;
  if (value.trim() === "") {
    nudge("Tente ta chance 💭");
    return;
  }
  if (isCorrect(puzzle, value)) {
    onCorrect(puzzle);
  } else {
    onWrong();
  }
}

function handleChoice(puzzle, opt, btn, grid) {
  // visual selection
  grid.querySelectorAll(".choice-btn, .image-choice").forEach((b) => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");

  if (isCorrect(puzzle, opt)) {
    onCorrect(puzzle);
  } else {
    onWrong();
  }
}

function onCorrect(puzzle) {
  const defaultMsg = `🎁 Va chercher le ${puzzle.giftLabel} !`;
  el.successMessage.textContent = puzzle.success || defaultMsg;
  el.puzzleCard.hidden = true;
  el.successCard.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function onWrong() {
  el.feedback.textContent = "Pas tout à fait — réessaie 💛";
  el.feedback.className = "feedback is-bad";
  el.puzzleCard.classList.remove("shake");
  // reflow to restart animation
  void el.puzzleCard.offsetWidth;
  el.puzzleCard.classList.add("shake");
}

function nudge(text) {
  el.feedback.textContent = text;
  el.feedback.className = "feedback is-bad";
}

/* ----- Moving on ----- */
function goNext() {
  state.index += 1;
  saveProgress();
  if (state.index >= puzzles.length) {
    finish();
  } else {
    renderPuzzle();
  }
}

function finish() {
  el.finalMessage.textContent = messages.final;
  showScreen("final");
  launchConfetti();
}

/* ----- Confetti (pure JS canvas, no library) ----- */
let confettiRAF = null;

function launchConfetti() {
  const canvas = el.confetti;
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  const colors = ["#e8896b", "#d46f52", "#6bbf8a", "#f7c948", "#e0736f", "#ffb37b"];
  const W = window.innerWidth;
  const pieces = [];
  const count = Math.min(160, Math.floor(W / 3));

  for (let i = 0; i < count; i++) {
    pieces.push({
      x: Math.random() * W,
      y: -20 - Math.random() * window.innerHeight,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 8,
      color: colors[(Math.random() * colors.length) | 0],
      rot: Math.random() * Math.PI,
      vr: -0.15 + Math.random() * 0.3,
      vy: 1.5 + Math.random() * 2.5,
      vx: -1 + Math.random() * 2,
      sway: Math.random() * Math.PI * 2,
    });
  }

  const start = performance.now();
  const duration = 5000;

  function frame(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach((p) => {
      p.sway += 0.03;
      p.x += p.vx + Math.sin(p.sway) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;

      if (p.y > window.innerHeight + 20) {
        // recycle while still within duration
        if (elapsed < duration - 1200) {
          p.y = -20;
          p.x = Math.random() * window.innerWidth;
        }
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < duration) {
      confettiRAF = requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  if (confettiRAF) cancelAnimationFrame(confettiRAF);
  confettiRAF = requestAnimationFrame(frame);
}

/* ----- Reset ----- */
function resetHunt() {
  clearProgress();
  detachKeyHandler();
  state.index = 0;
  el.resumeNote.hidden = true;
  if (confettiRAF) cancelAnimationFrame(confettiRAF);
  showScreen("landing");
}

/* ----- Wire up events ----- */
el.start.addEventListener("click", () => {
  showScreen("puzzle");
  renderPuzzle();
});

el.form.addEventListener("submit", handleTextSubmit);
el.nextBtn.addEventListener("click", goNext);
el.replayBtn.addEventListener("click", resetHunt);

el.resetLink.addEventListener("click", (e) => {
  e.preventDefault();
  resetHunt();
});

/* ----- Init ----- */
(function init() {
  state.index = loadProgress();
  if (state.index > 0 && state.index < puzzles.length) {
    el.resumeNote.hidden = false;
  }
  showScreen("landing");
})();
