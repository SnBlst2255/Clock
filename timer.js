let isRunningTimer = false;
let intervalTimer;
let stopTime = 0;
let remainTime = 0;

const audio = new Audio("sounds/timer-sound.ogg");

document.getElementById("start-timer").addEventListener("click", function () {
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

    if(parseInt(secInput.value) == 0 && parseInt(minInput.value) == 0 && parseInt(hrsInput.value) == 0){
        return;
    }

    document.getElementById("timer-set-panel").classList.add("hidden");
    document.getElementById("timer-display-panel").classList.remove("hidden");

    isRunningTimer = true;

    document.getElementById("timer-display").innerHTML = `${hrsInput.value}:${minInput.value}:${secInput.value}`;
    setTimeout(startTimer, 1000);
});

document.getElementById("reset-timer").addEventListener("click", function () {
    resetTimer();
});

document.getElementById("start-stop-timer").addEventListener("click", function (e) {
    if (isRunningTimer) {
        e.target.innerHTML = "Start";
        stopTimer();
    } else {
        e.target.innerHTML = "Stop";
        continueTimer();
    }
});

document.getElementById("close").addEventListener("click", function () {
    hideTimeIsUpPanel();
});

function startTimer() {
    const now = new Date();
    const startTime = now.getTime();

    const secInput = document.getElementById("seconds-timer");
    const minInput = document.getElementById("minutes-timer");
    const hrsInput = document.getElementById("hours-timer");


    stopTime = stopTime + startTime + (hrsInput.value * 3600000) + (minInput.value * 60000) + (secInput.value * 1000);

    startInterval();
}

function stopTimer(){
    isRunningTimer = false;
    clearInterval(intervalTimer); 
}

function continueTimer(){
    const now = new Date().getTime();
    stopTime = now + remainTime;

    isRunningTimer = true;
    startInterval(); 
}

function startInterval() {
    intervalTimer = setInterval(function () {
            updateRemainingTime();
            updateTimerDisplay();
    }, 100); 
}

function updateRemainingTime() {
    const currentTime = new Date().getTime();
    remainTime = stopTime - currentTime;

    if(remainTime <= 0){
        resetTimer();
        showTimeIsUpPanel();
    }else{
        updateTimerDisplay(); 
    }
}


function updateTimerDisplay() {

    const hours = String(Math.floor(remainTime / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((remainTime % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((remainTime % 60000) / 1000)).padStart(2, '0');

    document.getElementById("timer-display").innerHTML = `${hours}:${mins}:${secs}`;
}

function resetTimer() {
    document.getElementById("timer-set-panel").classList.remove("hidden");
    document.getElementById("timer-display-panel").classList.add("hidden");
    document.getElementById("time-is-up-panel").classList.add("hidden");
    document.getElementById("start-stop-timer").innerHTML = "Stop";

    remainTime = 0;
    stopTime = 0;
    isRunningTimer = false;

    clearInterval(intervalTimer);
}

function showTimeIsUpPanel() {
    document.getElementById("timer-display-panel").classList.add("hidden");
    document.getElementById("timer-set-panel").classList.add("hidden");
    document.getElementById("time-is-up-panel").classList.remove("hidden");

    audio.loop = true;
    audio.play();
}

function hideTimeIsUpPanel() {
    document.getElementById("timer-set-panel").classList.remove("hidden");
    document.getElementById("time-is-up-panel").classList.add("hidden");
    document.getElementById("timer-display-panel").classList.add("hidden");

    audio.pause();
    audio.currentTime = 0;
}