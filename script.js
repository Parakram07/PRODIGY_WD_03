// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const gameBoard = document.getElementById('game-board');
    const gameOptions = document.getElementById('game-options');
    const playVsPlayerButton = document.getElementById('play-vs-player');
    const playVsAIButton = document.getElementById('play-vs-ai');
    const restartButton = document.getElementById('restart-button');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let isPlayerVsAI = false;

    playVsPlayerButton.addEventListener('click', () => {
        startGame(false);
    });

    playVsAIButton.addEventListener('click', () => {
        startGame(true);
    });

    restartButton.addEventListener('click', restartGame);

    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    function startGame(vsAI) {
        isPlayerVsAI = vsAI;
        board = Array(9).fill(null);
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        gameOptions.classList.add('hidden');
        gameBoard.style.display = 'grid';
    }

    function restartGame() {
        board = Array(9).fill(null);
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win');
        });
        gameBoard.style.display = 'none';
        gameOptions.classList.remove('hidden');
    }

    function handleCellClick(cell) {
        const index = cell.getAttribute('data-index');
        if (board[index] || checkWinner()) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            highlightWinningCells();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (isPlayerVsAI && currentPlayer === 'O') {
            aiMove();
        }
    }

    function aiMove() {
        let availableIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
        let randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';

        if (checkWinner()) {
            highlightWinningCells();
            return;
        }

        currentPlayer = 'X';
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }

        return false;
    }

    function highlightWinningCells() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                cells[a].classList.add('win');
                cells[b].classList.add('win');
                cells[c].classList.add('win');
            }
        }
    }
});
