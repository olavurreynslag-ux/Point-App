const screens = document.querySelectorAll(".screen");

const clickSound = new Audio("click.mp3");
const kickSound = new Audio("point.mp3");
const crowdSound = new Audio("winning.mp3");

function playSound(sound) {
  try {
    sound.currentTime = 0;
    sound.play();
  } catch (error) {
    console.log("Lyd kunne ikke afspilles:", error);
  }
}

/* ---------- SKÆRMSKIFT ---------- */
function showScreen(screenId) {
  playSound(clickSound);
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
  playSound(kickSound);
  resetAfleveringerWinner();

  const scoreElement = document.getElementById(color + "Score");
  const currentScore = parseInt(scoreElement.textContent, 10) || 0;
  scoreElement.textContent = currentScore + points;
}

function finishAfleveringerGame() {
  const orange = parseInt(document.getElementById("orangeScore").textContent, 10) || 0;
  const yellow = parseInt(document.getElementById("yellowScore").textContent, 10) || 0;
  const blue = parseInt(document.getElementById("blueScore").textContent, 10) || 0;

  const scores = { orange, yellow, blue };
  const maxScore = Math.max(orange, yellow, blue);

  resetAfleveringerWinner();

  if (maxScore === 0) return;

  playSound(crowdSound);

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

function resetAfleveringerScore() {
  document.getElementById("orangeScore").textContent = "0";
  document.getElementById("yellowScore").textContent = "0";
  document.getElementById("blueScore").textContent = "0";
  resetAfleveringerWinner();
  playSound(clickSound);
}

/* ---------- PÅ TID ---------- */
let timeScores = {
  orange: 0,
  yellow: 0,
  blue: 0
};

let timeGameRunning = false;
let timeGamePaused = false;
let activeColor = null;
let timeInterval = null;

function updateTimeDisplay() {
  document.getElementById("orangeTime").textContent = String(timeScores.orange).padStart(2, "0");
  document.getElementById("yellowTime").textContent = String(timeScores.yellow).padStart(2, "0");
  document.getElementById("blueTime").textContent = String(timeScores.blue).padStart(2, "0");
}

function updateTimePauseUI() {
  const textButton = document.getElementById("timePauseButton");
  const icon = document.getElementById("timeToggleIcon");

  if (timeGamePaused) {
    textButton.textContent = "Genoptag";
    icon.src = "resume.png";
  } else {
    textButton.textContent = "Pause";
    icon.src = "pause.png";
  }
}

function startTimeGame() {
  playSound(clickSound);

  if (timeGameRunning) return;

  timeGameRunning = true;
  timeGamePaused = false;

  timeInterval = setInterval(() => {
    if (!timeGamePaused && activeColor) {
      timeScores[activeColor]++;
      updateTimeDisplay();
    }
  }, 1000);

  updateTimePauseUI();
}

function activateColor(color) {
  playSound(kickSound);

  if (!timeGameRunning) {
    startTimeGame();
  }

  timeGamePaused = false;
  activeColor = color;
  updateTimePauseUI();
}

function pauseResumeTime() {
  playSound(clickSound);

  if (!timeGameRunning) return;

  timeGamePaused = !timeGamePaused;
  updateTimePauseUI();
}

function finishTimeGame() {
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }

  timeGameRunning = false;
  timeGamePaused = false;
  activeColor = null;
  updateTimePauseUI();

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
    winners.length === 1 ? winners[0] + " vinder" : "Uafgjort: " + winners.join(", ");

  playSound(crowdSound);
}

function resetTimeGame() {
  if (timeInterval) {
    clearInterval(timeInterval);
    timeInterval = null;
  }

  timeScores = { orange: 0, yellow: 0, blue: 0 };
  timeGameRunning = false;
  timeGamePaused = false;
  activeColor = null;

  updateTimeDisplay();
  updateTimePauseUI();
  document.getElementById("winner").textContent = "Ingen endnu";
  playSound(clickSound);
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
}

function trekantClick(color) {
  playSound(kickSound);
  trekantScores[color]++;
  updateTrekantDisplay();
  document.getElementById("tLeader").textContent = "Spillet er i gang";
}

function finishTrekantGame() {
  const maxScore = Math.max(trekantScores.orange, trekantScores.yellow, trekantScores.blue);

  if (maxScore === 0) {
    document.getElementById("tLeader").textContent = "Ingen vinder endnu";
    return;
  }

  const leaders = [];
  if (trekantScores.orange === maxScore) leaders.push("Orange");
  if (trekantScores.yellow === maxScore) leaders.push("Gul");
  if (trekantScores.blue === maxScore) leaders.push("Blå");

  document.getElementById("tLeader").textContent =
    leaders.length === 1 ? leaders[0] + " vinder" : "Uafgjort: " + leaders.join(", ");

  playSound(crowdSound);
}

function resetTrekantGame() {
  trekantScores = { orange: 0, yellow: 0, blue: 0 };
  updateTrekantDisplay();
  document.getElementById("tLeader").textContent = "Ingen vinder endnu";
  playSound(clickSound);
}

/* ---------- STAFET ---------- */
let stafetInterval = null;
let stafetRunning = false;
let yellowTimeMs = 0;
let greenTimeMs = 0;
let yellowStopped = false;
let greenStopped = false;

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

function updateStafetStatus() {
  if (!stafetRunning && yellowTimeMs === 0 && greenTimeMs === 0) {
    document.getElementById("stafetStatus").textContent = "Klar";
    return;
  }

  if (yellowStopped && greenStopped) {
    document.getElementById("stafetStatus").textContent = "Færdig";
    return;
  }

  if (stafetRunning) {
    document.getElementById("stafetStatus").textContent = "I gang";
  }
}

function startStafet() {
  playSound(clickSound);

  if (stafetRunning) return;

  stafetRunning = true;
  yellowStopped = false;
  greenStopped = false;
  document.getElementById("stafetWinner").textContent = "Spillet er i gang";
  updateStafetStatus();

  stafetInterval = setInterval(() => {
    if (!yellowStopped) yellowTimeMs += 1000;
    if (!greenStopped) greenTimeMs += 1000;

    updateStafetDisplay();

    if (yellowStopped && greenStopped) {
      finishStafetGame();
    }
  }, 1000);
}

function stopYellow() {
  if (!stafetRunning || yellowStopped) return;
  playSound(kickSound);
  yellowStopped = true;
  updateStafetStatus();
}

function stopGreen() {
  if (!stafetRunning || greenStopped) return;
  playSound(kickSound);
  greenStopped = true;
  updateStafetStatus();
}

function finishStafetGame() {
  if (stafetInterval) {
    clearInterval(stafetInterval);
    stafetInterval = null;
  }

  stafetRunning = false;
  updateStafetStatus();

  if (yellowTimeMs === 0 && greenTimeMs === 0) {
    document.getElementById("stafetWinner").textContent = "Ingen vinder endnu";
    return;
  }

  if (!yellowStopped || !greenStopped) {
    document.getElementById("stafetWinner").textContent = "Stop begge hold først";
    return;
  }

  if (yellowTimeMs < greenTimeMs) {
    document.getElementById("stafetWinner").textContent = "Gul vinder";
  } else if (greenTimeMs < yellowTimeMs) {
    document.getElementById("stafetWinner").textContent = "Grøn vinder";
  } else {
    document.getElementById("stafetWinner").textContent = "Uafgjort";
  }

  playSound(crowdSound);
}

function resetStafet() {
  if (stafetInterval) {
    clearInterval(stafetInterval);
    stafetInterval = null;
  }

  stafetRunning = false;
  yellowTimeMs = 0;
  greenTimeMs = 0;
  yellowStopped = false;
  greenStopped = false;

  updateStafetDisplay();
  updateStafetStatus();
  document.getElementById("stafetWinner").textContent = "Ingen vinder endnu";
  playSound(clickSound);
}

/* ---------- STARTTILSTAND ---------- */
updateTimeDisplay();
updateTimePauseUI();
updateTrekantDisplay();
updateStafetDisplay();
updateStafetStatus();
