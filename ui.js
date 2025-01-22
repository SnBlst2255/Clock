import Clock from "./clock.js";
import StopWatch from "./stopwatch.js";
import Timer from "./timer.js";

const stopwatch = new StopWatch();
const clock = new Clock();
const timer = new Timer();

let intervalStopwatch = null;
const audio = new Audio("sounds/timer-sound.ogg");

//panel

function switchPanel(panelId, switchId) {
    const panels = ["clock-panel", "stopwatch-panel", "timer-panel"];
    const switches = ["clock-switch", "stopwatch-switch", "timer-switch"];

    panels.forEach(id => document.getElementById(id).classList.toggle("hidden", id !== panelId));
    switches.forEach(id => document.getElementById(id).classList.toggle("selected", id === switchId));
}

//Clock

function updateClock() {
    const date = clock.getDate();
    const time = clock.getTime();

    document.getElementById("current-time").textContent = time;
    document.getElementById("current-date").textContent = date;
}

//Stopwatch

function startStopwatch() {
    const lapBtn = document.getElementById("lap-stopwatch");

    document.getElementById("start-stop-stopwatch").textContent = "Stop";
    lapBtn.classList.remove("disabled");
    lapBtn.disabled = false;

    stopwatch.start();
    updateStopwatch();

    intervalStopwatch = setInterval(() => {
        updateStopwatch();
    }, 10);
}

function pauseStopwatch() {
    const lapBtn = document.getElementById("lap-stopwatch");

    document.getElementById("start-stop-stopwatch").textContent = "Start";
    lapBtn.classList.add("disabled");
    lapBtn.disabled = true;

    clearInterval(intervalStopwatch);
    stopwatch.pause();
}

function updateStopwatch() {
    const time = stopwatch.getTime();
    document.getElementById("stopwatch-display").textContent = time;
}

function resetStopwatch() {
    const lapBtn = document.getElementById("lap-stopwatch");

    document.getElementById("stopwatch-display").textContent = "00:00:00.00";
    document.getElementById("start-stop-stopwatch").textContent = "Start";

    lapBtn.classList.add("disabled");
    lapBtn.disabled = true;

    clearInterval(intervalStopwatch);
    stopwatch.reset();
    clearLapList();
}

function clearLapList() {
    const lapList = document.getElementById("lap-list");
    lapList.textContent = "";

    const span = document.createElement("span");
    span.textContent = "Laps will appear here";

    lapList.appendChild(span);
}

function updateLapList(data) {
    const lapList = document.getElementById("lap-list");

    if (data.laps - 1 == 0) {
        lapList.textContent = "";
    }

    const listItem = document.createElement("div");
    listItem.classList.add("lap-list-item");

    const lapCountSpan = document.createElement("span");
    lapCountSpan.textContent = data.laps;
    listItem.appendChild(lapCountSpan);

    const lapTimeSpan = document.createElement("span");
    lapTimeSpan.textContent = data.lapTime;
    listItem.appendChild(lapTimeSpan);

    const overallTimeSpan = document.createElement("span");
    overallTimeSpan.textContent = data.overall;
    listItem.appendChild(overallTimeSpan);

    lapList.appendChild(listItem);
}

//Timer

function startTimer() {

    const regex = /[0-9]{2}/;

    const secInput = document.getElementById("seconds-timer");
    const minInput = document.getElementById("minutes-timer");
    const hrsInput = document.getElementById("hours-timer");

    if (!regex.test(secInput.value) || parseInt(secInput.value) < 0 || parseInt(secInput.value) > 59) {
        return;
    }

    if (!regex.test(minInput.value) || parseInt(minInput.value) < 0 || parseInt(minInput.value) > 60) {
        return;
    }

    if (!regex.test(hrsInput.value) || parseInt(hrsInput.value) < 0 || parseInt(hrsInput.value) > 99) {
        return;
    }

    if (parseInt(secInput.value) == 0 && parseInt(minInput.value) == 0 && parseInt(hrsInput.value) == 0) {
        return;
    }

    document.getElementById("timer-set-panel").classList.add("hidden");
    document.getElementById("timer-display-panel").classList.remove("hidden");

    timer.startTimer(Number(hrsInput.value), Number(minInput.value), Number(secInput.value));
    
}

function pauseTimer() {
    timer.pause();
}

function continueTimer() {
    timer.continue();
}

function resetTimer() {
    document.getElementById("timer-set-panel").classList.remove("hidden");
    document.getElementById("timer-display-panel").classList.add("hidden");
    document.getElementById("time-is-up-panel").classList.add("hidden");
    document.getElementById("start-stop-timer").textContent = "Stop";

    timer.resetTimer();
}

function updateTimerDisplay() {
    const time = timer.getTime();
    document.getElementById("timer-display").textContent = `${time.hours}:${time.mins}:${time.secs}`;
}

function playTimerAlarm() {
    audio.loop = true;
    audio.play();
}

function muteTimerAlarm() {
    audio.pause();
    audio.currentTime = 0;
}

function showTimeIsUpPanel() {
    document.getElementById("timer-display-panel").classList.add("hidden");
    document.getElementById("timer-set-panel").classList.add("hidden");
    document.getElementById("time-is-up-panel").classList.remove("hidden");
}

function hideTimeIsUpPanel() {
    document.getElementById("timer-set-panel").classList.remove("hidden");
    document.getElementById("time-is-up-panel").classList.add("hidden");
    document.getElementById("timer-display-panel").classList.add("hidden");
}

//Listeners

window.onload = () => {
    timer.isRunningTimer = true;
    setInterval(updateClock, 100);
}

document.getElementById("start-stop-stopwatch").addEventListener("click", () => {
    if (!stopwatch.isRunningStopwatch) {
        startStopwatch();
    } else {
        pauseStopwatch();
    }
});

document.getElementById("reset-stopwatch").addEventListener("click", () => {
    resetStopwatch();
});

document.getElementById("lap-stopwatch").addEventListener("click", () => {
    updateLapList(stopwatch.addLap());
});

document.getElementById("start-timer").addEventListener("click", () => {
    startTimer();
});

document.getElementById("reset-timer").addEventListener("click", () => {
    resetTimer();
});

document.getElementById("start-stop-timer").addEventListener("click", e => {
    if (timer.isRunningTimer) {
        e.target.textContent = "Start";
        pauseTimer();
    } else {
        e.target.textContent = "Stop";
        continueTimer();
    }
});

document.addEventListener('timerStopped', () => {
    resetTimer();
    showTimeIsUpPanel();
    playTimerAlarm();
});

document.addEventListener('timeUpdate', () => {
    updateTimerDisplay();
});

document.getElementById("close").addEventListener("click", () => {
    hideTimeIsUpPanel();
    muteTimerAlarm();
});

document.getElementById("clock-switch").addEventListener("click", () => switchPanel("clock-panel", "clock-switch"));
document.getElementById("stopwatch-switch").addEventListener("click", () => switchPanel("stopwatch-panel", "stopwatch-switch"));
document.getElementById("timer-switch").addEventListener("click", () => switchPanel("timer-panel", "timer-switch"));