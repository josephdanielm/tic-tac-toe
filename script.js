const Gameboard = (function () {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const getBoard = () => board;

    const putMarker = (row, column, playerMarker) => {
        board[row][column] = playerMarker;
    }

    const checkFullBoard = () => {
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] === '') {
                    return false; // Found an empty cell
                }
            }
        }
        return true; // No empty cells found
    }

    const resetBoard = () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }


    const getMarkerAt = (row, column) => board[row][column];

    return {
        getBoard,
        putMarker,
        getMarkerAt,
        checkFullBoard,
        resetBoard
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

    let gameOverState = false;

    let winningPlayer = '';

    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;


    const checkWinner = () => {

        for (let i = 0; i < 3; i++) {
            if (board.getMarkerAt(i, 0) === board.getMarkerAt(i, 1) &&
                board.getMarkerAt(i, 1) === board.getMarkerAt(i, 2) &&
                board.getMarkerAt(i, 0) !== '') {
                return board.getMarkerAt(i, 0);
            }
        }

        for (let i = 0; i < 3; i++) {
            if (board.getMarkerAt(0, i) === board.getMarkerAt(1, i) &&
                board.getMarkerAt(1, i) === board.getMarkerAt(2, i) &&
                board.getMarkerAt(0, i) !== '') {
                return board.getMarkerAt(0, i);
            }
        }

        if (board.getMarkerAt(0, 0) === board.getMarkerAt(1, 1) &&
            board.getMarkerAt(1, 1) === board.getMarkerAt(2, 2) &&
            board.getMarkerAt(0, 0) !== '') {
            return board.getMarkerAt(0, 0);
        }

        if (board.getMarkerAt(0, 2) === board.getMarkerAt(1, 1) &&
            board.getMarkerAt(1, 1) === board.getMarkerAt(2, 0) &&
            board.getMarkerAt(0, 2) !== '') {
            return board.getMarkerAt(0, 2);
        }

        return '';
    }

    const getGameOver = () => gameOverState;

    const getWinningPlayer = () => winningPlayer;

    const resetGame = () => {
        gameOverState = false;
        winningPlayer = '';
        activePlayer = players[0];
    }

    const playRound = (row, column) => {

        if (board.getMarkerAt(row, column)) return;

        board.putMarker(row, column, activePlayer.getPlayerMarker());
        switchActivePlayer();

        const winner = checkWinner();
        // winner = 'X', 'O', or ''

        if (winner === 'X' || winner === 'O') {
            gameOverState = true;
            winningPlayer = winner;
            console.log(winner + ' wins!')
            return
        } else if (winner === '' && board.checkFullBoard()) { // HERE
            gameOverState = true;
            console.log('tie!')
            return
        }

    }

    return {
        switchActivePlayer,
        getActivePlayer,
        playRound,
        getGameOver,
        getWinningPlayer,
        resetGame
    }
})();




const DisplayController = (function () {
    const displayedBoard = document.getElementById('board')
        , panel = document.getElementById('left-panel')
        , displayedMessage = document.getElementById('displayed-message')
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

        if (!chosenCellRow) return;

        game.playRound(chosenCellRow, chosenCellColumn);
        drawBoard();

        // gameOver => True or False
        // winner => 'X', 'O', or ''
        const gameOver = GameController.getGameOver()
            , winner = GameController.getWinningPlayer();

        if (gameOver) {
            // disable click
            const buttons = document.querySelectorAll('.cell');
            buttons.forEach(button => {
                button.disabled = true;
            })
            // show reset button
            const resetButton = document.createElement('button');
            resetButton.classList.add('reset');
            resetButton.innerText = 'RESET'
            panel.appendChild(resetButton);

            resetButton.addEventListener('click', () => {
                Gameboard.resetBoard();
                GameController.resetGame();
                drawBoard();
                displayedBoard.addEventListener('click', clickBoard);
                displayedMessage.innerText = '';
                if (panel.contains(resetButton)) {
                    panel.removeChild(resetButton);
                }
            })

            if (winner !== '') {
                displayedMessage.innerText = `${winner} wins!`;
            } else {
                displayedMessage.innerText = `It's a tie!`;
            }
        }

    }

    displayedBoard.addEventListener('click', clickBoard);

    drawBoard();

})();




