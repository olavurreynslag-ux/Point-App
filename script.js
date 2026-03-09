let orangeScore = 0;
let yellowScore = 0;
let blueScore = 0;

let seconds = 0;
let timer = null;

function updateScores() {
  document.getElementById("orangeScore").textContent = orangeScore;
  document.getElementById("yellowScore").textContent = yellowScore;
  document.getElementById("blueScore").textContent = blueScore;

  let leader = "Uafgjort";
  if (orangeScore > yellowScore && orangeScore > blueScore) leader = "Orange";
  if (yellowScore > orangeScore && yellowScore > blueScore) leader = "Gul";
  if (blueScore > orangeScore && blueScore > yellowScore) leader = "Blå";

  document.getElementById("leader").textContent = leader;
}

document.getElementById("orangeBtn").onclick = () => {
  orangeScore++;
  updateScores();
};

document.getElementById("yellowBtn").onclick = () => {
  yellowScore++;
  updateScores();
};

document.getElementById("blueBtn").onclick = () => {
  blueScore++;
  updateScores();
};

function updateTimer() {
  seconds++;
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;

  document.getElementById("timer").textContent =
    String(min).padStart(2, "0") + ":" +
    String(sec).padStart(2, "0");
}

document.getElementById("startTimer").onclick = () => {
  if (!timer) timer = setInterval(updateTimer, 1000);
};

document.getElementById("stopTimer").onclick = () => {
  clearInterval(timer);
  timer = null;
};

document.getElementById("resetTimer").onclick = () => {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  document.getElementById("timer").textContent = "00:00";
};

document.getElementById("resetPoints").onclick = () => {
  orangeScore = 0;
  yellowScore = 0;
  blueScore = 0;
  updateScores();
};

updateScores();