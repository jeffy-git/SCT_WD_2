let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;
let lastLapTime = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps").querySelector("tbody");

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let milliseconds = Math.floor((ms % 1000) / 10);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds % 60;

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  milliseconds = milliseconds < 10 ? `0${milliseconds}` : milliseconds;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startStopTimer() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    startStopBtn.textContent = "Start";
  } else {
    startTime = Date.now();
    timer = setInterval(() => {
      display.textContent = formatTime(Date.now() - startTime + elapsedTime);
    }, 10);
    startStopBtn.textContent = "Stop";
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  lapCount = 0;
  lastLapTime = 0;
  display.textContent = formatTime(elapsedTime);
  laps.innerHTML = "";
  startStopBtn.textContent = "Start";
}

function recordLap() {
  if (isRunning) {
    lapCount++;
    const currentLapTime = Date.now() - startTime + elapsedTime;
    const lapTime = currentLapTime - lastLapTime;
    lastLapTime = currentLapTime;

    const lapElement = document.createElement("tr");
    lapElement.innerHTML = `
      <td>${lapCount}</td>
      <td>${formatTime(lapTime)}</td>
      <td>${formatTime(currentLapTime)}</td>
    `;
    laps.appendChild(lapElement);
  }
}

startStopBtn.addEventListener("click", startStopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

display.textContent = formatTime(elapsedTime);
