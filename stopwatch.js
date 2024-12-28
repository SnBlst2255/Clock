let isRunningStopwatch = false;
let intervalStopwatch;
let startTime, elapsedTime = 0;

let lastLapTime = 0;
let lapCount = 0;

function updateStopwatch() {
    const now = new Date().getTime();
    elapsedTime = now - startTime;

    const ms = Math.floor((elapsedTime % 1000) / 10); 
    const sec = Math.floor((elapsedTime / 1000) % 60);
    const min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hour = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    document.getElementById("stopwatch-display").innerHTML = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

function resetStopwatch() {
    elapsedTime = 0;
    lastLapTime = 0;
    lapCount = 0;
    isRunningStopwatch = false;
}

function addLap() {
    const now = new Date().getTime();
    const lapTime = now - startTime - lastLapTime;

    const ms = Math.floor((lapTime % 1000) / 10);
    const sec = Math.floor((lapTime / 1000) % 60);
    const min = Math.floor((lapTime / (1000 * 60)) % 60);
    const hour = Math.floor((lapTime / (1000 * 60 * 60)) % 24);

    lastLapTime += lapTime;

    const formattedLapTime = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    const overallTime = `${Math.floor((elapsedTime / (1000 * 60 * 60)) % 24).toString().padStart(2, '0')}:${Math.floor((elapsedTime / (1000 * 60)) % 60).toString().padStart(2, '0')}:${Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0')}.${Math.floor((elapsedTime % 1000) / 10).toString().padStart(2, '0')}`;

    updateLapList(formattedLapTime, overallTime);
}

function updateLapList(formattedLapTime, overallTime) {
    const lapList = document.getElementById("lap-list");

    if (lapCount == 0) {
        lapList.innerHTML = "";
    }

    lapCount++;

    let listItem = document.createElement("div");
    listItem.classList.add("lap-list-item");

    let lapCountSpan = document.createElement("span");
    lapCountSpan.innerHTML = `${lapCount}`;
    listItem.appendChild(lapCountSpan);

    let lapTimeSpan = document.createElement("span");
    lapTimeSpan.innerHTML = formattedLapTime;
    listItem.appendChild(lapTimeSpan);

    let overallTimeSpan = document.createElement("span");
    overallTimeSpan.innerHTML = overallTime;
    listItem.appendChild(overallTimeSpan);

    lapList.appendChild(listItem);
}

function clearLapList() {
    const lapList = document.getElementById("lap-list");
    lapList.innerHTML = "";

    let span = document.createElement("span");
    span.innerHTML = "Laps will appear here";
    
    lapList.appendChild(span);
}

document.getElementById("start-stop-stopwatch").addEventListener("click", function (e) {
    const lapBtn = document.getElementById("lap-stopwatch");

    if (!isRunningStopwatch) {
        e.target.innerHTML = "Stop";
        isRunningStopwatch = true;
        startTime = new Date().getTime() - elapsedTime;

        lapBtn.classList.remove("disabled");
        lapBtn.disabled = false;

        intervalStopwatch = setInterval(function () {
            updateStopwatch();
        }, 10);

    } else {
        e.target.innerHTML = "Start";
        isRunningStopwatch = false;
        clearInterval(intervalStopwatch);

        lapBtn.classList.add("disabled");
        lapBtn.disabled = true;
    }
});

document.getElementById("reset-stopwatch").addEventListener("click", function () {
    const lapBtn = document.getElementById("lap-stopwatch");

    document.getElementById("stopwatch-display").innerHTML = "00:00:00.00";
    document.getElementById("start-stop-stopwatch").innerHTML = "Start";

    lapBtn.classList.add("disabled");
    lapBtn.disabled = true;

    clearInterval(intervalStopwatch);
    resetStopwatch();
    clearLapList();
});

document.getElementById("lap-stopwatch").addEventListener("click", function () {
    addLap();
});
