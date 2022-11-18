

this.onload = function () {
    startGame()
}


const board = {
    // divInputParameteresDiv: {},
    // inputPuzzleRows: {},
    // inputPuzzleCols: {},


    // divGameFIeld: document.getElementById("gameField"),

    initBoard: () => {
        this.divInputParameteresDiv = document.getElementById("input_parameteres");
        this.inputPuzzleRows = document.getElementById("puzzleRows");
        this.inputPuzzleCols = document.getElementById("puzzleCols");
        this.divGameFIeld = document.getElementById("gameField");
    },

    showInitParams: () => {
        alert();
        this.divInputParameteresDiv.style.display = "inline";
        this.inputPuzzleRows.value = 5;
        this.inputPuzzleCols.value = 5;
    },
    clearField: board => {
        this.divGameFIeld = '';
        alert('field cleared');
    },
};

const controller = {
    startAlert: () => {
        alert('Starting game!');
    },
    showStartInfo: () => {
        alert('First, generate puzzle by setting rows and cols numbers and press Generate puzzle');
    },
    
};

function startGame() {

    controller.startAlert();
    controller.showStartInfo();
    board.initBoard();
    board.showInitParams();
}

function generateField() {
    board.clearField(board);
}



