/*------------------------ Cached Element References ------------------------*/

const squareEls =  document.querySelectorAll('.sqr');
const boardEl = document.querySelector('.board');
const messageEl = document.querySelector('#message');
const resetBtnEl =  document.querySelector('#reset');

/*-------------------------------- Constants --------------------------------*/
const board =['', '', '','', '', '','', '', ''];
const winningCombos = [
    // Horizontally
    [0,1,2],
    [3,4,5],
    [6,7,8],

    // Vertically
    [0,3,6],
    [1,4,7],
    [2,5,8],
    
    // Diagonally
    [0,4,8],
    [2,4,6]

];



/*---------------------------- Variables (state) ----------------------------*/
let turn = 'X';
let winner = false;
let tie = false; 
let squareIndex = -1;



/*-------------------------------- Functions --------------------------------*/

// Set the initial appearance of all squares
resetSquareStates();

function init(){
    board.forEach((sqr,index) =>{
        board[index] = '';
    })
    turn = 'X';
    winner = false;
    tie = false; 
    squareIndex = -1;
    resetSquareStates();
    render();
}

function handleClick(element){
    if(!element.textContent && !winner && !tie){
        const index = Number(element.id);
        squareIndex = index;
        placePiece();
        setSquareState(squareEls[index],'filled');
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
    }
}

function placePiece(){
    board[squareIndex] = turn;
}

function checkForWinner(){
    for(let combo of winningCombos){
        let [A,B,C] = combo;

        if(board[A] && board[A]===board[B] && board[B]===board[C]){
            winner = true;
            highlightWin(combo);
            break;
        }
    }
}

function checkForTie(){
    if(winner)
        return;

    for(let sqr of board){
        if(!sqr)
            return;
    }
    
    tie = true;
    highlightTie();
}

function switchPlayerTurn(){
    if(!winner){
        if(turn === 'X')
            turn = 'O';
        else
            turn = 'X';
    }

}
function render(){
    updateBoard();
    updateMessage();
}

function updateBoard(){
    board.forEach((sqr, index) => {
        squareEls[index].textContent = sqr;
    })
}

function updateMessage(){
    if(!winner && !tie){
        messageEl.textContent = 'It\'s '+ turn + ' turn';
    }else if (!winner && tie){
        messageEl.textContent = 'It\'s a tie!';
        messageEl.style.color = 'red';
        
    }else{
        messageEl.textContent = turn + ' wins!';
        messageEl.style.color = 'green';
    }
} 


// Functions for updating square appearance:
function setSquareState(sqr,state){
    sqr.className = 'sqr ' + state;
}

function resetSquareStates(){
    messageEl.style.color = 'black';
    squareEls.forEach(sqr=>{
        setSquareState(sqr,'not-filled');
    });
}

function highlightWin(combo){
    squareEls.forEach((sqr, index) => {
        if (combo.includes(index)) {
            setSquareState(sqr, 'win');
        }else if(!board[index]){
            setSquareState(sqr, 'blocked');
        }
    });
}

function highlightTie(){
    squareEls.forEach(sqr=>{
        setSquareState(sqr,'tie');
    })
}

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', event => {
    let element = event.target;
    if( element.classList && element.classList.contains('sqr')){
        handleClick(element);
    }
})

resetBtnEl.addEventListener('click', init);



