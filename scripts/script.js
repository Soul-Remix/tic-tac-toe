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
  const newboard = new Gameboard();
  newboard.forEach((obj) => {
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

const Gameboard = function () {
  const gameboard = cell;
  return gameboard;
};

let turn = true;

const startGame = function (one, two) {
  const game = new Gameboard();
  function play(e) {
    if (
      e.target.textContent === '' &&
      checkWin('X') !== true &&
      checkWin('O') !== true
    ) {
      if (turn === true) {
        e.target.textContent = one.name;
        turn = false;
        para.textContent = 'O player Turn';
        if (checkWin('X')) {
          para.textContent = 'X Player Win';
          turn = true;
          return;
        }
      } else if (turn === false && bo === false) {
        e.target.textContent = two.name;
        turn = true;
        para.textContent = 'X player Turn';
        if (checkWin('O')) {
          para.textContent = 'O Player Win';
          turn = true;
          return;
        }
      }
      while (turn === false && bo === true) {
        game[random()].textContent = two.name;
        turn = true;
        para.textContent = 'X player Turn';
        if (checkWin('O')) {
          para.textContent = 'O Player Win';
          turn = true;
          return;
        }
      }
    } else if (checkWin('X') === true || checkWin('O') === true) {
      turn = true;
      return;
    } else if (checkWin('X') === 'Draw' || checkWin('O') === 'Draw') {
      para.textContent = "It's a draw";
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
  const board = new Gameboard();
  const game = board.map((val) => {
    return val.textContent;
  });

  if (
    (game[0] == player && game[1] == player && game[2] == player) ||
    (game[3] == player && game[4] == player && game[5] == player) ||
    (game[6] == player && game[7] == player && game[8] == player)
  ) {
    return true;
  } else if (
    (game[0] == player && game[3] == player && game[6] == player) ||
    (game[1] == player && game[4] == player && game[7] == player) ||
    (game[2] == player && game[5] == player && game[8] == player)
  ) {
    return true;
  } else if (
    (game[0] == player && game[4] == player && game[8] == player) ||
    (game[2] == player && game[4] == player && game[6] == player)
  ) {
    return true;
  } else if (
    game.every((val) => {
      if (val !== '') {
        return true;
      }
    })
  ) {
    return 'Draw';
  } else {
    return false;
  }
};

function random() {
  const game = new Gameboard();
  let num = 0;

  for (i = 0; i < game.length; i++) {
    if (game[i].textContent === '') {
      num = i;
    }
  }
  return num;
}
