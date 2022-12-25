let puz = document.getElementById("puzzle-cont");
let bt = document.getElementById("button");
bt.onclick = function() {
    window.location.href = ("https://loginsecond.ccbp.tech/");
}
let puzzle = [];
let size = 4;


function getRow(pos) {
    return Math.ceil(pos / size);
}

function getCol(pos) {
    const col = pos % size;
    if (col === 0) {
        return size;
    }
    return col;
}

function generatePuzzle() {
    for (let i = 1; i <= size * size; i++) {
        puzzle.push({
            value: i,
            position: i,
            x: (getCol(i) - 1) * 75,
            y: (getRow(i) - 1) * 75,
            disable: false,
        });
    }

}

function renderPuzzle() {
    puz.innerHTML = "";
    for (let item of puzzle) {
        if (item.disable) {
            continue;
        }
        puz.innerHTML += `
        <div class="item" style="left: ${item.x}px; top:${item.y}px;">
        ${item.value}
        </div>
        `;
    }
}

function getRandomvalues() {
    const val = [];
    for (let i = 1; i <= size * size; i++) {
        val.push(i);
    }
    const randomval = val.sort(() => Math.random() - 0.5);
    return randomval;
}

function randomPuzzle() {
    let randomvalues = getRandomvalues();
    console.log(randomvalues);
    let i = 0;
    for (let item of puzzle) {
        item.value = randomvalues[i];
        i++;
    }
    const lastele = puzzle.find((item) => item.value === size * size);
    lastele.disable = true;
}
generatePuzzle();
randomPuzzle();
renderPuzzle();


function position(pos) {
    return puzzle.find(item => item.position === pos);
}

function empty() {
    return puzzle.find((item) => item.disable);

}

function swapPos(first, second, isX = false) {
    let temp = first.position;
    first.position = second.position;
    second.position = temp;
    if (isX) {
        temp = first.x;
        first.x = second.x;
        second.x = temp;
    } else {
        temp = first.y;
        first.y = second.y;
        second.y = temp;
    }

}


function emptyleft() {
    /*get the puzzle left to empty puzzle*/
    const emptyleft = empty();
    const leftedge = getCol(emptyleft.position === 1);
    if (leftedge) {

        return null;
    }

    const leftpos = position(emptyleft.position - size);
    return leftpos;
}

function emptyright() {
    const emptyright = empty();
    const rightedge = getCol(emptyright.position === size);
    if (rightedge) {

        return null;
    }

    const rightpos = position(emptyright.position + size);
    return rightpos;
}

function emptyup() {
    const emptyup = empty();
    const topedge = getRow(emptyup.position === 1);
    if (topedge) {
        return null;
    }

    const toppos = position(emptyup.position - size);
    return toppos;
}

function emptydown() {
    const emptydown = empty();
    const belowedge = getRow(emptydown.position === size);
    if (belowedge) {
        return null;
    }

    const belowpos = position(emptydown.position + size);
    return belowpos;
}

function right() {
    const emptypuz = empty();
    const leftpuz = emptyleft();
    if (leftpuz) {
        swapPos(emptypuz, leftpuz, true);
    }
}

function left() {
    const emptypuz = empty();
    const rightpuz = emptyright();
    if (rightpuz) {
        swapPos(emptypuz, rightpuz, true);
    }
}


function up() {
    const emptypuz = empty();
    const belowpuz = emptydown();
    if (belowpuz) {
        swapPos(emptypuz, belowpuz, false);
    }
}

function down() {
    const emptypuz = empty();
    const uppuz = emptyup();
    if (uppuz) {
        swapPos(emptypuz, uppuz, false);
    }
}


function handle(event) {

    console.log(event.key);
    switch (event.key) {
        case "ArrowLeft":
            left();
            break;
        case "ArrowRight":
            right();
            break;
        case "ArrowUp":
            up();
            break;
        case "ArrowDown":
            down();
            break;
        default:
            break;
    }
    renderPuzzle();
}

function handledInput() {
    document.addEventListener("keydown", handle);
}
handledInput();