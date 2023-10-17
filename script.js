const Gameboard = (function () {
    const board = [
        ['X', 'O', 'O'],
        ['O', 'X', 'O'],
        ['O', 'O', 'X']
    ];

    const getBoard = () => board;

    const putMarker = (row, column, playerMarker) => {
        board[row][column] = playerMarker;
    }

    return {
        getBoard,
        putMarker
    }
})();




function createPlayer(name, marker) {
    const playerName = name
        , playerMarker = marker;

    const getPlayerName = () => playerName;

    const getPlayerMarker = () => playerMarker;

    return { getPlayerName, getPlayerMarker };
}

// TEMP
const p1 = createPlayer('player1', 'X');
const p2 = createPlayer('player2', 'O');
// TEMP

const GameController = (function () {

    const board = Gameboard;

    const players = [p1, p2];

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;


    const playRound = (row, column) => {
        board.putMarker(row, column, activePlayer.getPlayerMarker());

        switchActivePlayer();

    }

    return {
        switchActivePlayer,
        getActivePlayer,
        playRound
    }
})();




const DisplayController = (function () {
    const displayedBoard = document.getElementById('board')
        , game = GameController;

    // Draw latest state of board array onto DOM as buttons
    const drawBoard = () => {
        const board = Gameboard.getBoard();

        displayedBoard.innerHTML = '';

        board.forEach((row, i) => {
            row.forEach((cell, j) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.dataset.row = i;
                cellButton.dataset.column = j;

                cellButton.textContent = cell;
                displayedBoard.appendChild(cellButton);
            })
        })
    }

    function clickBoard(event) {
        const chosenCellRow = event.target.dataset.row
            , chosenCellColumn = event.target.dataset.column;

        game.playRound(chosenCellRow, chosenCellColumn);
        drawBoard();
    }

    displayedBoard.addEventListener('click', clickBoard);

    return {
        drawBoard
    }

})();



DisplayController.drawBoard();


