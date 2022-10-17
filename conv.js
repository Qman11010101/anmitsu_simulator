const bpm = document.getElementById("bpm");
const note = document.getElementById("note");
const c_bpm = document.getElementById("c_bpm");
const c_note = document.getElementById("c_note");

const turn = document.getElementById("turn");
var turnClicked = false;

function clickTurn() {
    if (turnClicked) {
        turn.style.transform = "rotate(0deg)";
    } else {
        turn.style.transform = "rotate(180deg)";
    }
    turnClicked = !turnClicked;
}

function writeResult(type) {
    if (type === "n2b") {
        c_bpm.value = Math.round(bpm.value * (note.value / c_note.value) * 1000) / 1000;
        turnClicked = false;
        clickTurn();
    } else if (type === "b2n") {
        c_note.value = Math.round(note.value * (bpm.value / c_bpm.value) * 1000) / 1000;
        turnClicked = true;
        clickTurn();
    } else {
        if (turnClicked) {
            c_bpm.value = Math.round(bpm.value * (note.value / c_note.value) * 1000) / 1000;
        } else {
            c_note.value = Math.round(note.value * (bpm.value / c_bpm.value) * 1000) / 1000;
        }
    }
}

bpm.addEventListener("change", writeResult);
note.addEventListener("change", writeResult);
c_bpm.addEventListener("change", () => writeResult("b2n"));
c_note.addEventListener("change", () => writeResult("n2b"));

turn.addEventListener("click", clickTurn);

writeResult();
