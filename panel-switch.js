document.getElementById("clock-switch").addEventListener("click", function(e){
    document.getElementById("clock-panel").classList.remove("hidden");
    document.getElementById("stopwatch-panel").classList.add("hidden");
    document.getElementById("timer-panel").classList.add("hidden");

    document.getElementById("clock-switch").classList.add("selected");
    document.getElementById("stopwatch-switch").classList.remove("selected");
    document.getElementById("timer-switch").classList.remove("selected");
});

document.getElementById("stopwatch-switch").addEventListener("click", function(e){
    document.getElementById("clock-panel").classList.add("hidden");
    document.getElementById("stopwatch-panel").classList.remove("hidden");
    document.getElementById("timer-panel").classList.add("hidden");

    document.getElementById("stopwatch-switch").classList.add("selected");
    document.getElementById("clock-switch").classList.remove("selected");
    document.getElementById("timer-switch").classList.remove("selected");
});

document.getElementById("timer-switch").addEventListener("click", function(e){
    document.getElementById("clock-panel").classList.add("hidden");
    document.getElementById("stopwatch-panel").classList.add("hidden");
    document.getElementById("timer-panel").classList.remove("hidden");

    document.getElementById("timer-switch").classList.add("selected");
    document.getElementById("clock-switch").classList.remove("selected");
    document.getElementById("stopwatch-switch").classList.remove("selected");
});
