// ms
const JUSTICE_CRITICAL = 33.3333333333333333;
const JUSTICE = 66.6666666666666667;

const bpm = document.getElementById("bpm");
const note = document.getElementById("note");

const b_bpm = document.getElementById("b_bpm");
const b_note = document.getElementById("b_note");

const c_bpm = document.getElementById("c_bpm");
const c_note = document.getElementById("c_note");

function calcTimeBetweenNotes(bpm, note) {
    const notesPerSec = bpm * (note / 4) / 60;
    const notesBetween_ms = 1 / notesPerSec * 1000;
    return notesBetween_ms;
}

function calcTimeRange(mode, btw) {
    const range = mode === "jc" ? JUSTICE_CRITICAL : JUSTICE;
    const firstNoteRange = [-range, range];
    const secondNoteRange = [-range + btw, range + btw];
    return Math.max(0, firstNoteRange[1] - secondNoteRange[0]);
}

function writeResult() {
    const b = document.getElementById("bpm").value;
    const n = document.getElementById("note").value;
    const btw = calcTimeBetweenNotes(b, n);
    document.getElementById("betweenms").innerText = btw.toFixed(3);
    document.getElementById("jcms").innerText = calcTimeRange("jc", btw).toFixed(3);
    document.getElementById("jms").innerText = calcTimeRange("j", btw).toFixed(3);
    document.getElementById("outputfield").style.display = "block";
    document.getElementById("move_note").style.marginTop = String(Math.min(btw * 2, 300)) + "px";
}

bpm.addEventListener("input", writeResult);
note.addEventListener("input", writeResult);
bpm.addEventListener("input", () => {
    b_bpm.value = bpm.value;
});
note.addEventListener("input", () => {
    b_note.value = note.value;
});

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("outputfield").style.display = "none";
    const pre_queryDict = window.location.search.substring(1).split("&");
    pre_queryDict.forEach(e => {
        let kv = e.split("=");
        if (kv[0] === "bpm" && !isNaN(kv[1])) document.getElementById("bpm").value = kv[1];
        if (kv[0] === "note" && !isNaN(kv[1])) document.getElementById("note").value = kv[1];
    });
    writeResult();
});
