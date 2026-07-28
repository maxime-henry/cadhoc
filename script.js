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
    "T'as bien aimé ? \n\n" +
    "Bravo pour cette année incroyable, voyage, hyrox, maman d'un chat. Bravo pour l'année incroyable à venir. <br> \n\n" +
    "Joyeux anniversaire, petite bébé. 🎂🎉\n\n"+
    "I love you degezeur <br>\n\n"+
    "chetaime, non, Je t'aime <3 <br>\n\n"+
    "<img src=\"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTR4ZGtzNHdvNGdvM3ppdWU4d2FvZTU2OHFueHQ0bWM3Nm45NndpbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/aP3LozoEVcsn7SDtAN/giphy.gif\" alt=\"gif de loulou\">",
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
    id: 1, /* -- Livre comment masser mon chat, caché ces boites de patés -- */
    type: "wordle",
    title: "Le mot mystère",
    question:
      "Devine le mot \n(Vert = bien placé, jaune = mal placé, gris = absent.)",
    answer: "LOULOU",
    giftLabel: "Cadeau n°1",
    success: "🎁 Bravo, c'est lui, l'enculé!!! <br> Indice, un kdo ce trouve ici :<br><img src=\"https://images.ctfassets.net/gy95mqeyjg28/71Hqko1MOtbiPMd3y8iJM9/289a4d0e25d53b5025d727202e184db2/GP2304_102104_FC_1387.jpg\" alt=\"indice\">",
  },
  {
    id: 2, /* -- Appareil photo a pellicule cahcé dans la guitare -- */
    type: "image",
    title: "Remonte le temps",
    question: "Parmi ces photos de nous, laquelle est la plus ancienne ?",
    options: [
      { src: "photos/photo-1.jpg", value: "1" },
      { src: "photos/photo-2.jpg", value: "2" },  
      { src: "photos/photo-3.jpg", value: "3" },
      { src: "photos/photo-4.jpg", value: "4" },
    ],
    answer: "3" ,
    restartOn: ["1","2", "4"], // if the user selects this option, the hunt restarts
    giftLabel: "Cadeau n°2",
    success: "🎁 Bravo le veau, t'as trouvé la photo 'retro'<br> Tu pourras en faire d'autres en suivant cet indice: <img src=\"photos/guitare1.png\" alt=\"indice\">",
  },
      {
        id: 3, /* -- Livre comment bien dormir caché dans la boite des lego systeme solaire -- */
    type: "multi",
    title: "Coordination cardiaque",
    question:
      "Selon les experts, quels sont LES bons réflexes avant de dormir ?",
    options: [
      "Virer Abricot de la chambre",
      "Éteindre les écrans et lire un peu",
      "Regarder Widow's Bay",
      "Dissociation",
      "S'enfiler un euphytose nuit",
    ],
    answer: [
      "Virer Abricot de la chambre",
      "Éteindre les écrans et lire un peu",
      "S'enfiler un euphytose nuit",
    ],
    giftLabel: "Cadeau n°3",
    success: "Bah c'est super ça📖 <br> Indice, chez vous a la maison : <img src=\"https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyajRhMGE2eWRjb2hrYWp0Z3FzcnlsZ2l3Nnl5bWl4Nm14ZjdnOHE0YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/APq0WQXgQQrKFcBbjP/giphy.gif\" alt=\"indice\">",
  },
  {
    id: 4,
    type: "chronology",
    title: "Tu te souviens ?",
    question:
      "Touche deux photos pour les échanger et remets nos souvenirs dans l'ordre chronologique (du plus ancien au plus récent).",
    // List every photo of photos/chronology/ here, in the CORRECT chronological
    // order (oldest first). They will be shuffled automatically for the player.
    images: [
      "photos/chronology/1.jpeg",
      "photos/chronology/2.jpeg",
      "photos/chronology/3.jpeg",
      "photos/chronology/4.jpeg",
      "photos/chronology/5.jpeg",
      "photos/chronology/6.jpeg",
      "photos/chronology/7.jpeg",
      "photos/chronology/8.jpeg",
      "photos/chronology/9.jpeg",
      "photos/chronology/10.jpeg",
      "photos/chronology/11.jpeg",
      "photos/chronology/12.jpeg",
      "photos/chronology/14.jpeg",
      "photos/chronology/15.jpeg",
      "photos/chronology/16.jpeg",
      "photos/chronology/17.jpeg",
      "photos/chronology/18.jpeg",
      "photos/chronology/19.jpeg",
      "photos/chronology/20.jpeg",
      "photos/chronology/21.jpeg",
      "photos/chronology/22.jpeg",
    ],
    giftLabel: "Cadeau n°4",
    success: "Ici le cadeau, bah c'est ton année en fait!! Bravo et joyeux zaniv 🎁",
  },
  {
    id: 5, /* -- Juste une sucette en forme de coeur -- */
    type: "choice",
    title: "J'ai une question..",
    question: "Tu veux sortir avec moi ?",
    options: ["oui <3", "OUI", "Peut être", "Non", "Twogetzeur"],
    answer: ["oui <3", "OUI", "Twogetzeur"],
    restartOn: "Non",
    success: "💛",
  },
  {
    id: 6, /* -- Enssens spritz caché derriere le tableau du salon -- */
    type: "map",
    title: "Où sommes-nous ?",
    question: "Clique sur la carte pour deviner où a été prise cette photo !",
    image: "photos/where-1.jpg",
    answer: [59.9048112, 10.758863], // Precise coordinates of the location (latitude, longitude)
    winRadius: 0.3, // km — click within this radius to win
    success: "Indice : <em>'Finalement prendre soin, c'est savoir aimer'</em>",
  },
    {
    id: 7, /* -- Savon pour main caché je ne sais pas ou pour l'instant -- */
    type: "text",
    title: "Mot mystère",
    question:
      "Remets les lettres dans l'ordre pour trouver le mot mystère : U T I L S A I R",
    answer: "RITUALS",
    giftLabel: "Cadeau n°6",
    success: "🎁 Parce que ce qui compte dans la vie c'est les petits (loulou) produits 🧼 <br> Indice : <img src=\"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjhxZjM5ajNoaHJyMG5wZ2IwODBmYWVhN3Y3NG9kaHlscW5xOXkzMSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dz28kqvxiNTgkaFywk/giphy.gif\" alt=\"indice\">",
  },
  {
    id: 8,
    type: "fridge",
    title: "Il reste du poulet dans le frigo",
    question: "Clique sur tous les éléments pour vider le frigo !",
    fridge: "photos/firdge/fridge.png",
    items: [
      { src: "photos/firdge/elemets_in_fridge/1.png", left: 19, top: 21, width: 24, rotate: -5 },
      { src: "photos/firdge/elemets_in_fridge/2.png", left: 40, top: 22, width: 19, rotate: 3 },
      { src: "photos/firdge/elemets_in_fridge/3.png", left: 58, top: 23, width: 21, rotate: -2 },
      { src: "photos/firdge/elemets_in_fridge/4.png", left: 23, top: 38, width: 18, rotate: 4 },
      { src: "photos/firdge/elemets_in_fridge/5.png", left: 41, top: 38, width: 20, rotate: -4 },
      { src: "photos/firdge/elemets_in_fridge/6.png", left: 59, top: 39, width: 19, rotate: 3 },
      { src: "photos/firdge/elemets_in_fridge/7.png", left: 20, top: 55, width: 22, rotate: -3 },
      { src: "photos/firdge/elemets_in_fridge/8.png", left: 40, top: 55, width: 19, rotate: 5 },
      { src: "photos/firdge/elemets_in_fridge/9.png", left: 58, top: 55, width: 21, rotate: -5 },
      { src: "photos/firdge/elemets_in_fridge/10.png", left: 29, top: 71, width: 20, rotate: 3 },
      { src: "photos/firdge/elemets_in_fridge/11.png", left: 51, top: 70, width: 19, rotate: -2 },
      { src: "photos/firdge/elemets_in_fridge/12.png", left: 40, top: 85, width: 22, rotate: 4 },
      { src: "photos/firdge/elemets_in_fridge/13.png", left: 20, top: 85, width: 19, rotate: -3 },
    ],
    success: "Bravo, le frigo est vide ! 🧊",
  },
  {
    id: 9, /* -- Lunch box pour le travail, pas encore caché -- */
    type: "wordle",
    title: "Sell me this pen",
    question:
      "Devine le mot \n(Vert = bien placé, jaune = mal placé, gris = absent.)",
    answer: "EMLYON",
    giftLabel: "Cadeau n°7",
    success: "🎁 Félicitation pour ton poste, un cadeau utile ce situe dans 🎤 〰️",
  },
  {
    id: 10, /* -- Idée ici est de célébrer l'acomplissement de l'hyrox, cadeau peut etre restaurant ?-- */
    type: "memory",
    title: "Light's Off",
    question:
      "Retrouve les paires",
    images: [
      "photos/memory/IMG_3447.jpeg",
      "photos/memory/IMG_3455.jpeg",
      "photos/memory/IMG_3463.jpeg",
      "photos/memory/IMG_3475.jpeg",
      "photos/memory/IMG_3512.jpeg",
      "photos/memory/IMG_3420.jpeg",
    ],
    giftLabel: "Cadeau n°8",
    success: "🎁 Plus de mémoire que de cardio! Merci pour cet hyrox et bon anniversaire! On va aller bien manger pour récuperer de cet hyrox éprouvant",
  },
  {
    id: 11, /* -- Cadeau walking pad qui va arriver bientot -- */
    type: "guess",
    title: "Le nombre juste",
    question:
      "En moyenne, combien de pas de plus que toi fait Abricot par jour ?",
    answer: 15655,
    giftLabel: "Cadeau n°9",
    success: "🎁 Bravo! Oui je sais, c'est énorme. Mais il a des petites pattes d'enculé. <br> Psssst, ça arrive bientot 🤫 <img src=\"photos/walking-pad.PNG\" alt=\"indice\">",
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
  if (puzzle.type === "number" || puzzle.type === "guess") {
    const num = parseFloat(String(rawValue).replace(",", "."));
    return !Number.isNaN(num) && num === Number(puzzle.answer);
  }
  if (puzzle.type === "multi") {
    // rawValue is an array of selected option strings.
    const selected = (Array.isArray(rawValue) ? rawValue : []).map(normalize);
    const expected = (Array.isArray(puzzle.answer) ? puzzle.answer : [puzzle.answer]).map(normalize);
    if (selected.length !== expected.length) return false;
    const selSet = new Set(selected);
    return expected.every((a) => selSet.has(a)) && selSet.size === expected.length;
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

/* ----- Memory game ----- */
function renderMemory(puzzle) {
  // Build a deck: each photo twice, then shuffle.
  const deck = [];
  puzzle.images.forEach((src, i) => {
    deck.push({ pairId: i, src });
    deck.push({ pairId: i, src });
  });
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  const mState = { first: null, lock: false, matched: 0 };
  const grid = document.createElement("div");
  grid.className = "memory-grid";

  deck.forEach((card) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "memory-card";
    const img = document.createElement("img");
    img.src = card.src;
    img.alt = "";
    img.loading = "lazy";
    btn.appendChild(img);
    btn.addEventListener("click", () => flipCard(btn, card));
    grid.appendChild(btn);
  });

  function flipCard(btn, card) {
    if (mState.lock) return;
    if (btn.classList.contains("is-flipped") || btn.classList.contains("is-matched")) return;

    btn.classList.add("is-flipped");

    if (!mState.first) {
      mState.first = { btn, card };
      return;
    }

    const first = mState.first;
    if (first.card.pairId === card.pairId) {
      // Match!
      first.btn.classList.add("is-matched");
      btn.classList.add("is-matched");
      mState.first = null;
      mState.matched += 1;
      if (mState.matched === puzzle.images.length) {
        setTimeout(() => onCorrect(puzzle), 450);
      }
    } else {
      // No match — flip both back after a short delay.
      mState.lock = true;
      setTimeout(() => {
        first.btn.classList.remove("is-flipped");
        btn.classList.remove("is-flipped");
        mState.first = null;
        mState.lock = false;
      }, 800);
    }
  }

  el.inputArea.appendChild(grid);
}

/* ----- Chronology / ordering game ----- */
function swapNodes(a, b) {
  // Reliable DOM swap of two sibling nodes using a temporary marker.
  const marker = document.createComment("");
  a.parentNode.insertBefore(marker, a);
  b.parentNode.insertBefore(a, b);
  marker.parentNode.insertBefore(b, marker);
  marker.remove();
}

/* ----- Map (clickable geoguesser) game ----- */
let activeMap = null;

function destroyMap() {
  if (activeMap) {
    activeMap.remove();
    activeMap = null;
  }
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function renderMap(puzzle) {
  el.form.classList.add("is-choice"); // hide the Check button
  const [targetLat, targetLng] = puzzle.answer;
  const winRadius = puzzle.winRadius || 50;

  const wrapper = document.createElement("div");
  wrapper.className = "map-wrapper";

  const mapDiv = document.createElement("div");
  mapDiv.id = "map-container";
  wrapper.appendChild(mapDiv);

  const info = document.createElement("p");
  info.className = "map-info";
  info.textContent = "Clique sur la carte pour deviner !";
  wrapper.appendChild(info);

  el.inputArea.appendChild(wrapper);

  // Initialise Leaflet after DOM insertion so it can measure the container.
  const map = L.map("map-container", { zoomControl: true }).setView([30, 10], 2);
  activeMap = map;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    maxZoom: 18,
  }).addTo(map);

  let marker = null;
  let attempts = 0;

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    attempts++;

    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng]).addTo(map);

    const dist = haversineKm(lat, lng, targetLat, targetLng);

    if (dist <= winRadius) {
      // WIN — show the target and a line
      L.marker([targetLat, targetLng], {
        icon: L.divIcon({ className: "map-target-icon", html: "📍", iconSize: [28, 28] }),
      }).addTo(map);
      L.polyline([[lat, lng], [targetLat, targetLng]], { color: "#6bbf8a", dashArray: "6" }).addTo(map);
      info.innerHTML = `<strong>Bravo !</strong> C'était à ${Math.round(dist)} km — trouvé en ${attempts} essai${attempts > 1 ? "s" : ""} !`;
      info.classList.add("is-good");
      map.off("click"); // disable further clicks
      setTimeout(() => onCorrect(puzzle), 1200);
    } else {
      // Feedback with distance
      let emoji;
      if (dist < 200) emoji = "🔥";
      else if (dist < 500) emoji = "☀️";
      else if (dist < 1500) emoji = "🌤️";
      else if (dist < 3000) emoji = "❄️";
      else emoji = "🥶";
      info.textContent = `${emoji} À ${Math.round(dist).toLocaleString("fr-FR")} km, essaie encore !`;
      info.classList.remove("is-good");
    }
  });
}

function renderChronology(puzzle) {
  // The array order is the correct chronological order; shuffle for display.
  const items = puzzle.images.map((src, i) => ({ src, correct: i }));
  let order;
  do {
    order = items.slice();
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  } while (order.length > 1 && order.every((it, i) => it.correct === i));

  const grid = document.createElement("div");
  grid.className = "chronology-grid";
  grid.id = "chronology-grid";

  let selected = null;

  function renumber() {
    Array.from(grid.children).forEach((tile, i) => {
      const badge = tile.querySelector(".chronology-badge");
      if (badge) badge.textContent = i + 1;
    });
  }

  function selectTile(btn) {
    // A previously-selected tile may have been locked by a Check — drop it.
    if (selected && selected.classList.contains("is-locked")) {
      selected.classList.remove("is-selected");
      selected = null;
    }
    // Locked (correctly-placed) tiles can no longer be moved.
    if (btn.classList.contains("is-locked")) return;
    if (selected === btn) {
      btn.classList.remove("is-selected");
      selected = null;
      return;
    }
    if (!selected) {
      selected = btn;
      btn.classList.add("is-selected");
      return;
    }
    swapNodes(selected, btn);
    selected.classList.remove("is-selected");
    selected = null;
    renumber();
  }

  order.forEach((item) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chronology-tile";
    btn.dataset.correct = String(item.correct);
    const badge = document.createElement("span");
    badge.className = "chronology-badge";
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = "";
    img.loading = "lazy";
    btn.appendChild(img);
    btn.appendChild(badge);
    btn.addEventListener("click", () => selectTile(btn));
    grid.appendChild(btn);
  });

  el.inputArea.appendChild(grid);
  renumber();
}

/* ----- Empty-the-fridge game ----- */
function renderFridge(puzzle) {
  el.form.classList.add("is-choice");

  const game = document.createElement("div");
  game.className = "fridge-game";

  const fridge = document.createElement("img");
  fridge.className = "fridge-background";
  fridge.src = puzzle.fridge;
  fridge.alt = "Réfrigérateur ouvert";
  game.appendChild(fridge);

  let remaining = puzzle.items.length;

  puzzle.items.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "fridge-item";
    button.style.left = `${item.left}%`;
    button.style.top = `${item.top}%`;
    button.style.width = `${item.width}%`;
    button.style.setProperty("--item-rotation", `${item.rotate || 0}deg`);
    button.setAttribute("aria-label", `Retirer l'élément ${index + 1}`);

    const image = document.createElement("img");
    image.src = item.src;
    image.alt = "";
    button.appendChild(image);

    button.addEventListener("click", () => {
      if (button.disabled) return;
      button.disabled = true;
      button.classList.add("is-removed");
      remaining -= 1;

      if (remaining === 0) {
        setTimeout(() => onCorrect(puzzle), 400);
      }
    });

    game.appendChild(button);
  });

  el.inputArea.appendChild(game);
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
  destroyMap();

  // Optional illustrative photo shown above the input (e.g. "where was this taken?")
  if (puzzle.image) {
    const fig = document.createElement("img");
    fig.src = puzzle.image;
    fig.alt = "";
    fig.loading = "lazy";
    fig.className = "puzzle-photo";
    el.inputArea.appendChild(fig);
  }

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
  } else if (puzzle.type === "multi") {
    // Multi-select QCM: toggle options, then validate with the Check button.
    const grid = document.createElement("div");
    grid.className = "choice-grid";
    grid.id = "multi-grid";
    puzzle.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.dataset.value = opt;
      btn.textContent = opt;
      btn.addEventListener("click", () => {
        btn.classList.toggle("is-selected");
      });
      grid.appendChild(btn);
    });
    el.inputArea.appendChild(grid);
  } else if (puzzle.type === "map") {
    renderMap(puzzle);
  } else if (puzzle.type === "memory") {
    el.form.classList.add("is-choice");
    renderMemory(puzzle);
  } else if (puzzle.type === "fridge") {
    renderFridge(puzzle);
  } else if (puzzle.type === "chronology") {
    renderChronology(puzzle);
  } else {
    const input = document.createElement("input");
    input.id = "answer-input";
    if (puzzle.type === "number") {
      input.type = "number";
      input.inputMode = "decimal";
      input.className = "number-input";
      input.placeholder = "Entre un nombre";
    } else if (puzzle.type === "guess") {
      input.type = "number";
      input.inputMode = "numeric";
      input.className = "number-input";
      input.placeholder = "Devine le nombre";
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
  if (!puzzle || puzzle.type === "choice" || puzzle.type === "wordle" || puzzle.type === "map") return;
  if (puzzle.type === "chronology") {
    const grid = document.getElementById("chronology-grid");
    if (!grid) return;
    const tiles = Array.from(grid.querySelectorAll(".chronology-tile"));
    // Lock every correctly-placed photo so it can no longer be moved.
    let lockedCount = 0;
    tiles.forEach((t, i) => {
      if (Number(t.dataset.correct) === i) {
        t.classList.add("is-locked");
        t.classList.remove("is-selected");
      }
      if (t.classList.contains("is-locked")) lockedCount++;
    });
    const ordered = lockedCount === tiles.length;
    if (ordered) {
      onCorrect(puzzle);
    } else {
      el.feedback.textContent = `${lockedCount}/${tiles.length} bien placées et verrouillées ✅ — continue !`;
      el.feedback.className = "feedback is-good";
      el.puzzleCard.classList.remove("shake");
      void el.puzzleCard.offsetWidth;
      el.puzzleCard.classList.add("shake");
    }
    return;
  }
  if (puzzle.type === "multi") {
    const grid = document.getElementById("multi-grid");
    if (!grid) return;
    const selected = Array.from(grid.querySelectorAll(".choice-btn.is-selected")).map(
      (b) => b.dataset.value
    );
    if (selected.length === 0) {
      nudge("Sélectionne au moins une réponse 💭");
      return;
    }
    if (isCorrect(puzzle, selected)) {
      onCorrect(puzzle);
    } else {
      onWrong();
    }
    return;
  }
  const input = document.getElementById("answer-input");
  if (!input) return;
  const value = input.value;
  if (value.trim() === "") {
    nudge("Tente ta chance 💭");
    return;
  }
  if (isCorrect(puzzle, value)) {
    onCorrect(puzzle);
  } else if (puzzle.type === "guess") {
    const num = parseFloat(String(value).replace(",", "."));
    if (Number.isNaN(num)) {
      onWrong();
    } else if (num < Number(puzzle.answer)) {
      el.feedback.textContent = "C'est plus ⬆️";
      el.feedback.className = "feedback is-bad";
      el.puzzleCard.classList.remove("shake");
      void el.puzzleCard.offsetWidth;
      el.puzzleCard.classList.add("shake");
    } else {
      el.feedback.textContent = "C'est moins ⬇️";
      el.feedback.className = "feedback is-bad";
      el.puzzleCard.classList.remove("shake");
      void el.puzzleCard.offsetWidth;
      el.puzzleCard.classList.add("shake");
    }
  } else {
    onWrong();
  }
}

function handleChoice(puzzle, opt, btn, grid) {
  // visual selection
  grid.querySelectorAll(".choice-btn, .image-choice").forEach((b) => b.classList.remove("is-selected"));
  btn.classList.add("is-selected");

  // Some puzzles restart the whole game if a specific option is chosen.
  if (puzzle.restartOn) {
    const restartOpts = Array.isArray(puzzle.restartOn) ? puzzle.restartOn : [puzzle.restartOn];
    if (restartOpts.some((r) => normalize(r) === normalize(opt))) {
      resetHunt();
      return;
    }
  }

  if (isCorrect(puzzle, opt)) {
    onCorrect(puzzle);
  } else {
    onWrong();
  }
}

function onCorrect(puzzle) {
  const defaultMsg = `🎁 Va chercher le ${puzzle.giftLabel} !`;
  el.successMessage.innerHTML = puzzle.success || defaultMsg;
  el.puzzleCard.hidden = true;
  el.successCard.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function onWrong() {
  el.feedback.textContent = "Pas tout à fait, réessaie";
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
    el.puzzleCard.classList.add("is-input-locked");
    setTimeout(() => el.puzzleCard.classList.remove("is-input-locked"), 350);
  }
}

function finish() {
  el.finalMessage.innerHTML = messages.final.replace(/\n/g, "<br>");
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
  destroyMap();
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

/* ----- Dev: auto-solve current puzzle ----- */
document.getElementById("solve-btn").addEventListener("click", () => {
  const puzzle = puzzles[state.index];
  if (!puzzle) return;
  detachKeyHandler();
  onCorrect(puzzle);
});

/* ----- Init ----- */
(function init() {
  state.index = loadProgress();
  if (state.index > 0 && state.index < puzzles.length) {
    el.resumeNote.hidden = false;
  }
  showScreen("landing");
})();
