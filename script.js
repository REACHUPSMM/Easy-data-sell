let workTime = 2 * 60; // 2 minutes
let cooldownTime = 1 * 60; // 1 minute

let isRunning = false;

function startCycle() {
    if (isRunning) return; // prevent double click

    isRunning = true;
    runWorkTimer();
}

function runWorkTimer() {
    let timer = workTime;
    let display = document.getElementById("timer");

    let workInterval = setInterval(() => {
        let m = Math.floor(timer / 60);
        let s = timer % 60;

        display.innerHTML = `WORK: ${m}:${s < 10 ? "0" : ""}${s}`;

        timer--;

        if (timer < 0) {
            clearInterval(workInterval);
            runCooldown();
        }
    }, 1000);
}

function runCooldown() {
    let timer = cooldownTime;
    let display = document.getElementById("timer");

    let coolInterval = setInterval(() => {
        let m = Math.floor(timer / 60);
        let s = timer % 60;

        display.innerHTML = `COOLDOWN: ${m}:${s < 10 ? "0" : ""}${s}`;

        timer--;

        if (timer < 0) {
            clearInterval(coolInterval);
            isRunning = false; // allow restart
            display.innerHTML = "READY TO START";
        }
    }, 1000);
}
