// ms
const JUSTICE_CRITICAL = 33.3333333333333333;
const JUSTICE          = 66.6666666666666667;

function calcTimeBetweenNotes(bpm, note) {
    const notesPerSec = bpm * (note / 4) / 60;
    const notesBetween_ms = 1 / notesPerSec * 1000;
    return notesBetween_ms;
}

function writeResult() {
    document.getElementById("betweenms").innerText = calcTimeBetweenNotes(document.getElementById("bpm").value, document.getElementById("note").value);
    document.getElementById("jcms").innerText = calcTimeRange("jc", )
    document.getElementById("outputfield").style.display = "block";
}

document.getElementById("bpm").addEventListener("change", () => {
    writeResult();
});

document.getElementById("note").addEventListener("change", () => {
    writeResult();
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