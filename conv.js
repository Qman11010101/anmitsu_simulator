const b_bpm = document.getElementById("b_bpm");
const b_note = document.getElementById("b_note");
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

function writeResultConv(type) {
    if (type === "n2b") {
        c_bpm.value = Math.round(b_bpm.value * (b_note.value / c_note.value) * 1000) / 1000;
        turnClicked = false;
        clickTurn();
    } else if (type === "b2n") {
        c_note.value = Math.round(b_note.value * (b_bpm.value / c_bpm.value) * 1000) / 1000;
        turnClicked = true;
        clickTurn();
    } else {
        if (turnClicked) {
            c_bpm.value = Math.round(b_bpm.value * (b_note.value / c_note.value) * 1000) / 1000;
        } else {
            c_note.value = Math.round(b_note.value * (b_bpm.value / c_bpm.value) * 1000) / 1000;
        }
    }
}

b_bpm.addEventListener("input", writeResultConv);
b_note.addEventListener("input", writeResultConv);
c_bpm.addEventListener("input", () => writeResultConv("b2n"));
c_note.addEventListener("input", () => writeResultConv("n2b"));

turn.addEventListener("click", clickTurn);

writeResultConv();
