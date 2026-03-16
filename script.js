const screens = document.querySelectorAll(".screen");

/* ---------- Generelt ---------- */
function showScreen(screenId) {
  screens.forEach(screen => screen.classList.add("hidden"));
  document.getElementById(screenId).classList.remove("hidden");
}

/* ---------- AFLEVERINGER ---------- */
function resetAfleveringerWinner() {
  ["orange", "yellow", "blue"].forEach(color => {
    const winnerEl = document.getElementById(color + "Winner");
    const scoreEl = document.getElementById(color + "Score");
    const buttonEl = scoreEl.closest(".scoreIconButton");

    winnerEl.classList.add("hidden");
    buttonEl.classList.remove("hasWinner");
  });
}

function addPoint(color, points) {
  resetAfleveringerWinner();

  const scoreElement = document.getElementById(color + "Score");
  const currentScore = parseInt(scoreElement.textContent, 10) || 0;
  scoreElement.textContent = currentScore + points;
}
function resetAfleveringerScore() {
  document.getElementById("orangeScore").textContent = "0";
  document.getElementById("yellowScore").textContent = "0";
  document.getElementById("blueScore").textContent = "0";

  resetAfleveringerWinner();
}

function finishAfleveringerGame() {
  const orange = parseInt(document.getElementById("orangeScore").textContent, 10) || 0;
  const yellow = parseInt(document.getElementById("yellowScore").textContent, 10) || 0;
  const blue = parseInt(document.getElementById("blueScore").textContent, 10) || 0;

  const scores = { orange, yellow, blue };
  const maxScore = Math.max(orange, yellow, blue);

  resetAfleveringerWinner();

  if (maxScore === 0) return;

  Object.keys(scores).forEach(color => {
    if (scores[color] === maxScore) {
      const winnerEl = document.getElementById(color + "Winner");
      const scoreEl = document.getElementById(color + "Score");
      const buttonEl = scoreEl.closest(".scoreIconButton");

      winnerEl.classList.remove("hidden");
      buttonEl.classList.add("hasWinner");
    }
  });
}

/* ---------- PÅ TID ---------- */
let timeScores = {
  orange: 0,
  yellow: 0,
  blue: 0
};

let activeColor = null;
let timeGameRunning = false;
let timeGamePaused = false;
let timeInterval = null;

function updateTimeDisplay() {
  document.getElementById("orangeTime").textContent = String(timeScores.orange).padStart(2, "0");
  document.getElementById("yellowTime").textContent = String(timeScores.yellow).padStart(2, "0");
  document.getElementById("blueTime").textContent = String(timeScores.blue).padStart(2, "0");
}

function activateColor(color) {
  if (!timeGameRunning) {
    timeGameRunning = true;
    timeGamePaused = false;

    timeInterval = setInterval(() => {
      if (!timeGamePaused && activeColor) {
        timeScores[activeColor]++;
        updateTimeDisplay();
      }
    }, 1000);
  }

  if (!timeGamePaused) {
    activeColor = color;
  }
}

function pauseResume() {
  if (!timeGameRunning) return;

  timeGamePaused = !timeGamePaused;
  document.getElementById("pauseBtn").textContent = timeGamePaused ? "Genoptag" : "Pause";
}

function stopGame() {
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }

  timeGameRunning = false;
  timeGamePaused = false;
  activeColor = null;
  document.getElementById("pauseBtn").textContent = "Pause";

  const maxTime = Math.max(timeScores.orange, timeScores.yellow, timeScores.blue);

  if (maxTime === 0) {
    document.getElementById("winner").textContent = "Ingen endnu";
    return;
  }

  const winners = [];
  if (timeScores.orange === maxTime) winners.push("Orange");
  if (timeScores.yellow === maxTime) winners.push("Gul");
  if (timeScores.blue === maxTime) winners.push("Blå");

  document.getElementById("winner").textContent =
    winners.length === 1 ? winners[0] : "Uafgjort: " + winners.join(", ");
}

/* ---------- TREKANT ---------- */
let trekantScores = {
  orange: 0,
  yellow: 0,
  blue: 0
};

function updateTrekantDisplay() {
  document.getElementById("tOrange").textContent = trekantScores.orange;
  document.getElementById("tYellow").textContent = trekantScores.yellow;
  document.getElementById("tBlue").textContent = trekantScores.blue;

  const maxScore = Math.max(trekantScores.orange, trekantScores.yellow, trekantScores.blue);

  if (maxScore === 0) {
    document.getElementById("tLeader").textContent = "Ingen";
    return;
  }

  const leaders = [];
  if (trekantScores.orange === maxScore) leaders.push("Orange");
  if (trekantScores.yellow === maxScore) leaders.push("Gul");
  if (trekantScores.blue === maxScore) leaders.push("Blå");

  document.getElementById("tLeader").textContent =
    leaders.length === 1 ? leaders[0] : "Uafgjort: " + leaders.join(", ");
}

function trekantClick(color) {
  trekantScores[color]++;
  updateTrekantDisplay();
}

/* ---------- STAFET ---------- */
let stafetInterval = null;
let stafetRunning = false;
let yellowTimeMs = 0;
let greenTimeMs = 0;

function formatMs(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function updateStafetDisplay() {
  document.getElementById("yellowStafet").textContent = formatMs(yellowTimeMs);
  document.getElementById("greenStafet").textContent = formatMs(greenTimeMs);
}

function startStafet() {
  resetStafet();

  stafetRunning = true;
  stafetInterval = setInterval(() => {
    if (stafetRunning) {
      yellowTimeMs += 1000;
      greenTimeMs += 1000;
      updateStafetDisplay();
    }
  }, 1000);

  document.getElementById("yellowBtn").classList.remove("stopped");
  document.getElementById("greenBtn").classList.remove("stopped");
}

function stopYellow() {
  if (!stafetRunning) return;
  document.getElementById("yellowBtn").classList.add("stopped");
}

function stopGreen() {
  if (!stafetRunning) return;
  document.getElementById("greenBtn").classList.add("stopped");
}

function resetStafet() {
  if (stafetInterval) {
    clearInterval(stafetInterval);
    stafetInterval = null;
  }

  stafetRunning = false;
  yellowTimeMs = 0;
  greenTimeMs = 0;
  updateStafetDisplay();

  document.getElementById("yellowBtn").classList.remove("stopped");
  document.getElementById("greenBtn").classList.remove("stopped");
}

/* ---------- Starttilstand ---------- */
updateTimeDisplay();
updateTrekantDisplay();
updateStafetDisplay();
