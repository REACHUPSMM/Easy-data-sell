let workTime = 2 * 60;
let cooldownTime = 1 * 60;
let running = false;

function startNewTimer() {
    if (running) return;
    running = true;

    runWork();
}

function runWork() {
    let time = workTime;
    let display = document.getElementById("timer");

    let t = setInterval(() => {
        let m = Math.floor(time / 60);
        let s = time % 60;

        display.innerHTML = `WORK: ${m}:${s < 10 ? "0" : ""}${s}`;

        time--;

        if (time < 0) {
            clearInterval(t);
            runCooldown();
        }
    }, 1000);
}

function runCooldown() {
    let time = cooldownTime;
    let display = document.getElementById("timer");

    let t = setInterval(() => {
        let m = Math.floor(time / 60);
        let s = time % 60;

        display.innerHTML = `COOLDOWN: ${m}:${s < 10 ? "0" : ""}${s}`;

        time--;

        if (time < 0) {
            clearInterval(t);
            running = false;
            display.innerHTML = "READY";
        }
    }, 1000);
}
