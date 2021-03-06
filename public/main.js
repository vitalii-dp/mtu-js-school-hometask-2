const grid = Array(290);

//Select DOM elements
const gameField = document.getElementById('game-field');
const scoreElement = document.getElementById('score');
const timer = document.getElementById('timer');
const scoreResult = document.getElementById('score-result');
const nameInput = document.getElementById('name-input');
const tableContent = document.getElementById('table-body');
const startButton = document.getElementById('start-button');
const saveButton = document.getElementById('save-button');
const newGameButton = document.getElementById('new-game-button');
const resetButton = document.getElementById('reset-table-button');

let isGameOver = true;
let score = 0;
let time = 60;
let squares = [];
let filledSquaresCounter = 0;
const colorClasses = ['green-square', 'red-square', 'blue-square', 'purple-square', 'orange-square'];

//Fetch and reset results 
let results;

window.addEventListener('load', async () => {
  results = await fetchResults() || []
  fillResultsTable()
});

function fetchResults() {
  const rawResults = fetch('/results').then(res => res.json()).catch(error => console.log(error))
  return rawResults
}

function fillResultsTable() {
  if (results) {
    results.forEach(result => tableContent.innerHTML += `<tr><td>${result.name}</td><td>${result.score}</td></tr>`);
  } else {
    return;
  }
}

resetButton.addEventListener('click', () => {
  deleteResults()
  tableContent.innerHTML = '';
})

function deleteResults() {
  fetch('/results', {
    method: 'DELETE'
  }).catch(error => console.log(error))
}

//Generate field with blocks
function createGrid() {
  for (let i = 0; i < grid.length; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    gameField.appendChild(square);
    squares.push(square);
  }
}

function fillGrid() {
  for (let i = 0; i < 10; i++) {
    createSquare();
  }
}

function createSquare() {
  const randomIndex = Math.floor(Math.random() * grid.length);
  const randomColor = Math.floor(Math.random() * colorClasses.length);
  if (squares[randomIndex].classList.contains('filled-square')) {
    createSquare();
    return;
  }
  squares[randomIndex].classList.add('filled-square', colorClasses[randomColor]);
  filledSquaresCounter++;
}

function createRandomSquares() {
  const squaresNumber = Math.round(Math.random() * 2);
  for (let i = 0; i < squaresNumber; i++) {
    createSquare();
  }
  if (filledSquaresCounter <= 2) {
    fillGrid();
  }
}

gameField.addEventListener('click', (e) => {
  if (e.target.classList.contains('filled-square') && !isGameOver) {
    const color = e.target.classList[2];
    e.target.classList = 'square';
    if (color == 'orange-square') {
      clearInterval(gameTimerId);
      time += 2;
      handleTimer();
    } else {
      score += colorClasses.indexOf(color) + 1;
      scoreElement.innerText = score;
    }
    filledSquaresCounter--;
    createRandomSquares();
  };
});

function startGame() {
  isGameOver = false;
  startButton.disabled = true;
  handleTimer();
}

startButton.addEventListener('click', startGame);

//Handle the timer
let gameTimerId;

function handleTimer() {
  updateTimer();
  gameTimerId = setInterval(updateTimer, 1000);

  function updateTimer() {
    if (time <= 0) {
      clearInterval(gameTimerId);
      isGameOver = true;
      showModal();
    }
    timer.textContent = time--;
  }
}

//Reset game field, timer and points
newGameButton.addEventListener('click', resetGame);

function resetGame() {
  nameInput.value = ''
  isGameOver = true;
  score = 0;
  scoreElement.innerText = score;
  time = 60;
  timer.textContent = time;
  startButton.disabled = false;
  clearInterval(gameTimerId);
  clearGrid();
  fillGrid();
}

function clearGrid() {
  squares.forEach(square => square.classList = 'square');
}

//Show modal and save results
function showModal() {
  $('.modal').modal('show');
  scoreResult.innerText = score;
}

saveButton.addEventListener('click', saveResults);

async function saveResults() {
  const name = nameInput.value || 'Anonymous';
  const response = await postResults({name, score})
  tableContent.innerHTML = '';
  response.forEach(result => tableContent.innerHTML += `<tr><td>${result.name}</td><td>${result.score}</td></tr>`);
}

async function postResults(data) {
  const response = await fetch('/results', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json()).catch(error => console.log(error))
  return response
}

createGrid();
fillGrid();