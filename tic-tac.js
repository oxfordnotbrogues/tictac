const ticGrid = Array.from(document.querySelectorAll('.grid'));
const ticBoard = document.querySelector('.tic__board');
const Announcer = document.querySelector('.announcer')
const displayPlayer = document.querySelector('.display-player');
const playerDisplay = document.querySelector('.display');
const Reset = document.querySelector('#reset');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = "x";
let isGameActive = true;
const playerx_WON = 'playerX_WON';
const playerO_WON = 'playerY_WON';
const TIE = 'TIE';

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [0, 4, 8],
    [2, 4, 6],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];
/*class UI {
     displayText() {
        if(user) {
            ticGrid[0].innerHTML = "x";  
        } else {
            ticGrid[0].innerHTML = "o";
        }
    }
}*/
function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        console.log(winCondition)
        const a = board[winCondition[0]];
        console.log(a)
        const b = board[winCondition[1]];
        console.log(b)
        const c = board[winCondition[2]];
        console.log(c)
        if(a === '' || b === '' || c === ' ') {
            continue;
        }
        if(a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if(roundWon) {
        announce(currentPlayer === 'x'? playerx_WON : playerO_WON);
        isGameActive = false;
        return;
    }
    if(!board.includes(''))
    announce(TIE);
}

const announce =(type) => {
    switch(type) {
        case playerO_WON:
            Announcer.innerHTML = `player <span class = "playerO">O</span>`;
        break;
        case playerx_WON:
            Announcer.innerHTML = `player <span class = "playerO">X</span>`;
        break;
        case TIE:
            Announcer.innerText = 'tie'
    }
    Announcer.classList.remove('hide');
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
}
validAction = (grid) => {
    if(grid.innerText === 'x' || grid.innerText === 'o') {
        return false;
    }
    return true;
}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer ==='x'? 'o' : 'x';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}
const resetBoard = () => {
    board = ['', '', '', '', '', '', '', ''];
    isGameActive = true;
    Announcer.classList.add('hide');
    if (currentPlayer === 'o') {
        changePlayer();
    }
    ticGrid.forEach(grid => {
        grid.innerText = '';
        grid.classList.remove('playerX');
        grid.classList.remove('playerO')
    })
}

const userAction = (grid, index) => {
    if(validAction(grid) && isGameActive) {
        grid.innerText = currentPlayer;
       grid.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}


ticGrid.forEach((grid, index) => {
    grid.addEventListener('click', () => userAction(grid, index));
})
Reset.addEventListener('click', resetBoard);