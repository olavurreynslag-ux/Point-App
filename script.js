// SKÆRME
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
}

// --------------------
// AFLEVERINGER
// --------------------
let scores = {
  orange: 0,
  yellow: 0,
  blue: 0
};

function addPoint(color, value) {
  scores[color] += value;

  document.getElementById("orangeScore").textContent = scores.orange;
  document.getElementById("yellowScore").textContent = scores.yellow;
  document.getElementById("blueScore").textContent = scores.blue;

  updateLeader();
}

function updateLeader() {
  const max = Math.max(scores.orange, scores.yellow, scores.blue);
  const leaders = [];

  if (scores.orange === max && max > 0) leaders.push("Orange");
  if (scores.yellow === max && max > 0) leaders.push("Gul");
  if (scores.blue === max && max > 0) leaders.push("Blå");

  let leaderText = "Ingen";
  if (leaders.length === 1) leaderText = leaders[0];
  if (leaders.length > 1) leaderText = "Uafgjort";

  document.getElementById("leader").textContent = leaderText;
}

// --------------------
// PÅ TID
// --------------------
let times = {
  orange: 0,
  yellow: 0,
  blue: 0
};

let activeColor = null;
let paused = false;

function activateColor(color) {
  activeColor = color;
  paused = false;
  document.getElementById("pauseBtn").textContent = "Pause";
}

setInterval(() => {
  if (activeColor && !paused) {
    times[activeColor]++;

    document.getElementById("orangeTime").textContent = times.orange;
    document.getElementById("yellowTime").textContent = times.yellow;
    document.getElementById("blueTime").textContent = times.blue;
  }
}, 1000);

function pauseResume() {
  if (!activeColor) return;

  paused = !paused;
  document.getElementById("pauseBtn").textContent = paused ? "Genoptag" : "Pause";
}

function stopGame() {
  paused = true;

  const max = Math.max(times.orange, times.yellow, times.blue);
  const leaders = [];

  if (times.orange === max && max > 0) leaders.push("Orange");
  if (times.yellow === max && max > 0) leaders.push("Gul");
  if (times.blue === max && max > 0) leaders.push("Blå");

  let winnerText = "Ingen";
  if (leaders.length === 1) winnerText = leaders[0];
  if (leaders.length > 1) winnerText = "Uafgjort";

  document.getElementById("winner").textContent = "Førende hold: " + winnerText;
}

// --------------------
// TREKANT
// --------------------
let tScores = {
  orange: 0,
  yellow: 0,
  blue: 0
};

let lastClicks = [];

function trekantClick(color) {
  lastClicks.push(color);
  if (lastClicks.length > 3) {
    lastClicks.shift();
  }

  tScores[color] += 1;

  if (lastClicks.length === 3 && lastClicks.every(c => c === color)) {
    tScores[color] += 2;
  }

  document.getElementById("tOrange").textContent = tScores.orange;
  document.getElementById("tYellow").textContent = tScores.yellow;
  document.getElementById("tBlue").textContent = tScores.blue;

  const max = Math.max(tScores.orange, tScores.yellow, tScores.blue);
  const leaders = [];

  if (tScores.orange === max && max > 0) leaders.push("Orange");
  if (tScores.yellow === max && max > 0) leaders.push("Gul");
  if (tScores.blue === max && max > 0) leaders.push("Blå");

  let leaderText = "Ingen";
  if (leaders.length === 1) leaderText = leaders[0];
  if (leaders.length > 1) leaderText = "Uafgjort";

  document.getElementById("tLeader").textContent = leaderText;
}

// --------------------
// STAFET
// --------------------
let stafetTimer = null;
let stafetSeconds = 0;
let stafetRunning = false;

function formatTime(totalSeconds) {
  const min = Math.floor(totalSeconds / 60);
  const sec = totalSeconds % 60;
  return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

function startStafet() {
  clearInterval(stafetTimer);
  stafetSeconds = 0;
  stafetRunning = true;

  document.getElementById("yellowStafet").textContent = "00:00";
  document.getElementById("greenStafet").textContent = "00:00";

  stafetTimer = setInterval(() => {
    stafetSeconds++;
    const formatted = formatTime(stafetSeconds);

    document.getElementById("yellowStafet").textContent = formatted;
    document.getElementById("greenStafet").textContent = formatted;
  }, 1000);
}

function stopYellow() {
  if (!stafetRunning) return;
  clearInterval(stafetTimer);
  stafetRunning = false;
}

function stopGreen() {
  if (!stafetRunning) return;
  clearInterval(stafetTimer);
  stafetRunning = false;
}

function resetStafet() {
  clearInterval(stafetTimer);
  stafetRunning = false;
  stafetSeconds = 0;

  document.getElementById("yellowStafet").textContent = "00:00";
  document.getElementById("greenStafet").textContent = "00:00";
}
