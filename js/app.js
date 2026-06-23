/*------------------------ Cached Element References ------------------------*/

const squareEls =  document.querySelectorAll('.sqr');
const boardEl = document.querySelector('.board');
const messageEl = document.querySelector('#message');
const resetBtnEl =  document.querySelector('#reset');

/*-------------------------------- Constants --------------------------------*/
const board =['', '', '','', '', '','', '', ''];
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],
    
    [0,4,8],
    [2,4,6]

];



/*---------------------------- Variables (state) ----------------------------*/
let turn = 'X';
let winner = false;
let tie = false; 
let squareIndex = -1;



/*-------------------------------- Functions --------------------------------*/
function render(){
    updateBoard();
    updateMessage();
}

function updateBoard(){
    board.forEach((cell, index) => {
        squareEls[index].textContent = cell;
        if(cell)
            squareEls[index].classList.add('filled');
        else
            squareEls[index].classList.remove('filled');
    })
}

function init(){
    board.forEach((sqr,index) =>{
        board[index] = '';
    })
    turn = 'X';
    winner = false;
    tie = false; 
    squareIndex = -1;
    messageEl.style.color = 'black';
    squareEls.forEach(sqr=>{
        sqr.style.backgroundColor = '';
        sqr.classList.remove('blocked');
        sqr.classList.remove('filled');
    })
    render();
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
        squareEls.forEach(sqr=>{
            if(sqr.textContent == ''){
                sqr.classList.add('blocked');
            }
        })
    }
}

function handleClick(element){
    if(!element.textContent && !winner){
        const index = Number(element.id);
        squareIndex = index;
        placePiece(index);
        checkForWinner();
        checkForTie();
        switchPlayerTurn();
        render();
    }
}
function placePiece(index){
    board[index] = turn;
}
function checkForWinner(){
    for(let combo of winningCombos){
        let [A,B,C] = combo;

        if(board[A] && board[A]==board[B] && board[B]==board[C]){
            winner = true;
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
}
function switchPlayerTurn(){
    if(!winner){
        if(turn == 'X')
            turn = 'O';
        else
            turn = 'X';
    }
}


//  init();

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener('click', event => {
    let element = event.target;
    if( element.classList && element.classList.contains('sqr')){
        handleClick(element);
    }
})

resetBtnEl.addEventListener('click', init);



