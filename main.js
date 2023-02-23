// ms
const JUSTICE_CRITICAL = 33.3333333333333333;
const JUSTICE = 66.6666666666666667;

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

document.getElementById("bpm").addEventListener("input", writeResult);
document.getElementById("note").addEventListener("input", writeResult);

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
