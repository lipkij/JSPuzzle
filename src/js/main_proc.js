
COLS = 2;
ROWS = 2;


this.onload = function () {
    startGame()
}


function dragStart(e) {
    if (e.target.getAttribute('draggable')) {
        this.style.opacity = '0.4';
        e.dataTransfer.setData("chip_id", e.target.id);
        e.dataTransfer.setData("chip_diff_x", e.target.getBoundingClientRect().left - e.pageX);
        e.dataTransfer.setData("chip_diff_y", e.target.getBoundingClientRect().top - e.pageY);
    }
}


function dragEnd(e) {
    this.style.opacity = '1';
}


function checkWin() {
    return !document.querySelectorAll(".not_placed").length;
}


function dragDrop(e) {
    e.preventDefault();
    let chip_id = e.dataTransfer.getData("chip_id");
    let cell_id = e.target.id;
    let chip = document.getElementById(chip_id);
    let cell = document.getElementById(cell_id);

    if (!!chip) {
        if (chip_id == cell_id.substring(4)) {
            chip.style.top = parseInt(e.target.style.top) + 1 + "px";
            chip.style.left = parseInt(e.target.style.left) + 1 + "px";
            cell.style.border = "1px solid #0F0";
            chip.removeAttribute('draggable');
            chip.classList.remove('not_placed');
            if (checkWin()) {
                alert('You win!');
                setTimeout(() => { document.getElementById('gameField').innerHTML = ''; location.reload(); }, 1000);
            };
        } else {
            chip.style.top = (e.pageY + parseInt(e.dataTransfer.getData("chip_diff_y"))) + "px";
            chip.style.left = (e.pageX + parseInt(e.dataTransfer.getData("chip_diff_x"))) + "px";
        }
    }
}


function dragOver(e) {
    e.preventDefault();
    return false;
}


function createCell(i, j) {
    let puzzleCell = document.createElement('div');
    puzzleCell.style.position = "absolute";
    puzzleCell.style.backgroundColor = "#FFF";
    puzzleCell.classList.add('cell');
    puzzleCell.id = "cellrow" + i + "col" + j;
    puzzleCell.style.width = 48 + "px";
    puzzleCell.style.height = 48 + "px";
    puzzleCell.style.border = "1px solid #999";
    puzzleCell.style.top = i * 50 + "px";
    puzzleCell.style.left = j * 50 + "px";
    puzzleCell.addEventListener('dragover', dragOver);
    puzzleCell.addEventListener('drop', dragDrop);
    return puzzleCell;
}


function createChip(i, j) {
    let puzzleChip = document.createElement('div');
    puzzleChip.style.position = "absolute";
    puzzleChip.id = "row" + i + "col" + j;
    puzzleChip.style.width = 46 + "px";
    puzzleChip.style.height = 46 + "px";
    puzzleChip.style.border = "1px solid #000";
    puzzleChip.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    puzzleChip.classList.add('chip');
    puzzleChip.classList.add('not_placed');
    puzzleChip.style.top = i * 50 + 1 + "px";
    puzzleChip.style.left = j * 50 + 1 + "px";
    puzzleChip.setAttribute('draggable', 'true');
    puzzleChip.addEventListener('dragstart', dragStart);
    puzzleChip.addEventListener('dragend', dragEnd);
    puzzleChip.style.zIndex = 1000;
    return puzzleChip;
}


function getRows() {
    return ROWS;
}


function getCols() {
    return COLS;
}


function beginGame() {
    let chips = document.getElementsByClassName("chip");

    for (let i = 0; i < chips.length; i++) {
        chips[i].style.top = Math.random() * getRows() * 50 + "px";
        chips[i].style.left = getCols() * 50 + Math.random() * getCols() * 50 + "px";
    }

    this.style.display = "none";

}


function startGame() {
    let cols = getCols();
    let rows = getRows();
    let gameField = document.getElementById('gameField');
    gameField.style.width = 50 * cols;
    gameField.style.height = 50 * rows;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            gameField.appendChild(createCell(i, j));
            gameField.appendChild(createChip(i, j));
        }
    }

    let buttonStart = document.createElement('button');
    buttonStart.textContent = "Start game";
    buttonStart.style.width = "200px";
    buttonStart.style.height = "50px";
    buttonStart.style.position = "absolute";
    buttonStart.style.top = 50 * rows + 50 + "px";
    buttonStart.style.left = (50 * cols) / 2 - 100 + "px";
    buttonStart.onclick = beginGame;
    gameField.append(buttonStart);
}