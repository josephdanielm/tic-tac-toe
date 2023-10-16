const Gameboard = (function () {
    const board = [
        ['X', 'O', 'O'],
        ['O', 'X', 'O'],
        ['O', 'O', 'X']
    ];

    const getBoard = () => board;

    const printBoard = () => {
        console.table(board);
    }

    const putMarker = (row, column, playerMarker) => {
        board[row][column] = playerMarker;
    }

    return {
        getBoard,
        printBoard,
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




const GameController = (function () {

})();





const DisplayController = (function () {
    const displayedBoard = document.getElementById('board');

    const drawBoard = () => {
        const board = Gameboard.getBoard();

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

    return {
        drawBoard
    }

})();



DisplayController.drawBoard();


