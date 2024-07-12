// ms
const JUSTICE_CRITICAL_PLUS = 16.6666666666666667;
const JUSTICE_CRITICAL = 33.3333333333333333;
const JUSTICE = 66.6666666666666667;
const ATTACK = 100;

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
    const range = mode === "a" ? ATTACK : mode === "j" ? JUSTICE : mode === "jc" ? JUSTICE_CRITICAL : JUSTICE_CRITICAL_PLUS;
    const firstNoteRange = [-range, range];
    const secondNoteRange = [-range + btw, range + btw];
    return Math.max(0, firstNoteRange[1] - secondNoteRange[0]);
}

function writeResult() {
    const b = bpm.value;
    const n = note.value;
    const btw = calcTimeBetweenNotes(b, n);
    document.getElementById("betweenms").innerText = btw.toFixed(3);

    const jcpms = document.getElementById("jcpms");
    const jcms = document.getElementById("jcms");
    const jms = document.getElementById("jms");
    const ams = document.getElementById("ams");
    const jspmsTime = calcTimeRange("jcp", btw);
    const jcmsTime = calcTimeRange("jc", btw);
    const jmsTime = calcTimeRange("j", btw);
    const amsTime = calcTimeRange("a", btw);
    jcpms.innerText = jspmsTime.toFixed(3);
    jcms.innerText = jcmsTime.toFixed(3);
    jms.innerText = jmsTime.toFixed(3);
    ams.innerText = amsTime.toFixed(3);
    jcpms.style.color = jspmsTime > 0 ? "red" : "black";
    jcms.style.color = jcmsTime > 0 ? "red" : "black";
    jms.style.color = jmsTime > 0 ? "red" : "black";
    ams.style.color = amsTime > 0 ? "red" : "black";
    document.getElementById("outputfield").style.display = "block";
    document.getElementById("move_note").style.marginTop = String(Math.min(btw * 2, 410)) + "px";
    const border = document.getElementById("border");
    const oyaSize = document.getElementById("visualizer-wrapper").offsetHeight;
    border.style.top = String(oyaSize / 2 + 6) + "px";
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
        if (kv[0] === "bpm" && !isNaN(kv[1])) bpm.value = kv[1];
        if (kv[0] === "note" && !isNaN(kv[1])) note.value = kv[1];
    });
    writeResult();
});
