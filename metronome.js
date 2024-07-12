var beatIdx = 0;

function metronome(place) {
    const mtrobj = document.getElementById("u-metronome");
    const beats = mtrobj.getElementsByClassName("metronome-beat");
    const bpmval = bpm.value;
    const noteval = note.value;
    const beatLength = calcTimeBetweenNotes(bpmval, noteval);

    const intervalId = setInterval(() => {
        const beat = beats[beatIdx];
        beat.style.backgroundColor = "#f00";
        setTimeout(() => {
            beat.style.backgroundColor = "#ccc";
        }, beatLength);
        beatIdx = (beatIdx + 1) % beats.length;
        if (beatIdx % 4 === 0) soundBeat(beatLength / 1000);
    }, beatLength);

    const stop = document.getElementById("stop-metronome-upper");
    stop.addEventListener("click", () => {
        clearInterval(intervalId);
        beatIdx = 0;
    });
}

function createMetronomeObject(place, noteval) {
    const metronome = document.getElementById("u-metronome");
    while (metronome.firstChild) {
        metronome.removeChild(metronome.firstChild);
    }
    const hasSubBeat = noteval % 4 === 0;
}

function soundBeat(lengthSeconds) {
    const soundctx = new AudioContext();
    const osc = soundctx.createOscillator();
    osc.connect(soundctx.destination);
    osc.start();
    osc.stop(lengthSeconds);
}