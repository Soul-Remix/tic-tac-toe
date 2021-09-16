const start = document.querySelector('.start-btn');
const startDiv = document.querySelector('.start');
const opponent = document.querySelector('.opponent');
const bot = document.querySelector('.bot');
const human = document.querySelector('.human');
const board = document.querySelector('.board');
const table = document.querySelector('table');
const res = document.querySelector('.res');
const cell = Array.from(document.querySelectorAll('.cell'));
const resBtn = document.querySelector('.res-btn');
const para = document.querySelector('.result');

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

let hu = false;
let bo = false;

start.addEventListener('click', function (e) {
  opponent.classList.add('active');
  opponent.classList.remove('hidden');
  startDiv.classList.add('hidden');
  startDiv.classList.remove('active');
});

function display() {
  const show = function () {
    board.classList.add('active');
    board.classList.remove('hidden');
    res.classList.add('active');
    res.classList.remove('hidden');
    opponent.classList.remove('active');
    opponent.classList.add('hidden');
  };

  const hide = function () {
    board.classList.remove('active');
    board.classList.add('hidden');
    res.classList.remove('active');
    res.classList.add('hidden');
    startDiv.classList.add('active');
    startDiv.classList.remove('hidden');
  };

  return { show, hide };
}

const dis = new display();

bot.addEventListener('click', function (e) {
  bo = true;
  dis.show();
  startGame(playerX, playerO);
});

human.addEventListener('click', function (e) {
  hu = true;
  dis.show();
  startGame(playerX, playerO);
});

resBtn.addEventListener('click', function () {
  dis.hide();
  cell.forEach((obj) => {
    obj.textContent = '';
  });
  para.textContent = '';
  turn = true;
  hu = false;
  bo = false;
});

const Player = function (name) {
  this.name = name;
};

const playerX = new Player('X');
const playerO = new Player('O');

let turn = true;

const startGame = function (one, two) {
  function play(e) {
    if (e.target.textContent === '' && !gameOver()) {
      if (turn === true) {
        e.target.textContent = one.name;
        turn = false;
        para.textContent = 'O player Turn';
        checkWin('X');
        checkWin('O');
      } else if (turn === false && bo === false) {
        e.target.textContent = two.name;
        turn = true;
        para.textContent = 'X player Turn';
        checkWin('X');
        checkWin('O');
      }
      while (turn === false && bo === true) {
        cell[random()].textContent = two.name;
        turn = true;
        para.textContent = 'X player Turn';
        checkWin('X');
        checkWin('O');
      }
    } else if (gameOver()) {
      turn = true;
      return;
    }
  }
  if (checkWin('X') !== true && checkWin('O') !== true) {
    table.addEventListener('click', play, false);
  } else if (checkWin('X') === true || checkWin('O') === true) {
    table.removeEventListener('click', play, false);
    return;
  }
};

const checkWin = function (player) {
  const game = cell.map((val) => {
    return val.textContent;
  });

  if (winMoves(winCombos, player, game)) {
    para.textContent = `${player} Player Wins`;
    return true;
  } else if (game.every((val) => val !== '')) {
    para.textContent = "It's a draw";
    return 'Draw';
  } else {
    return false;
  }
};

function random() {
  const game = cell.map((val) => {
    return val.textContent;
  });

  let num = Math.floor(Math.random() * 9);

  if (game.every((val) => val !== '')) {
    return 1;
  }

  if (game[num] === '') {
    return num;
  } else {
    return random();
  }
}

function gameOver() {
  return checkWin('X') === true || checkWin('O') === true;
}

function winMoves(arr, player, game) {
  for (let i = 0; i < arr.length; i++) {
    if (
      game[arr[i][0]] === player &&
      game[arr[i][1]] === player &&
      game[arr[i][2]] === player
    ) {
      return true;
    }
  }
}
