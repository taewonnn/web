'use strict';

const carrotSize = 80;
const carrotCount = 5;
const bugCount = 5;
const gameDurationSec = 5;

const field = document.querySelector('.game-field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game-button');
const gameTimer = document.querySelector('.game-timer');
const gameScore = document.querySelector('.game-score');

// 팝업
const popUp = document.querySelector('.popup');
const popUpText = document.querySelector('.popup-message');
const popUpRefresh = document.querySelector('.popup-message');

// 초기값
let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  console.log('click');
  if (started) {
    stopGame();
  } else {
    startGame();
  }
  started = !started;
});

function startGame() {
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
}

function stopGame() {
  stopGameTimer();
}

function startGameTimer() {
  let remainingTimeSec = gameDurationSec;
  updateTimerText(remainingTimeSec);
  // 주기적으로 반복 할 때
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
  hideGameButton();
  showPopUpWithText('REPLAY? ');
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes} : ${seconds}`;
}

function showTimerAndScore() {
  gameTimer.style.visibility = 'visible';
  gameScore.style.visibility = 'visible';
}

function hideGameButton() {
  gameBtn.style.visibility = 'hidden';
}

function showStopButton() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showPopUpWithText(text) {
  popUpText.innerText = text;
  popUp.classList.remove('popup-hide');
}

function initGame() {
  // 벌레와 당근을 생성한 뒤 field에 추가
  // console.log(fieldRect);

  // 초기화
  field.innerHTML = '';
  gameScore.innerText = carrotCount;

  addItem('carrot', carrotCount, 'img/carrot.png');
  addItem('bug', bugCount, 'img/bug.png');
}

function addItem(className, count, imgPath) {
  // 기본값
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - carrotSize;
  const y2 = fieldRect.height - carrotSize;

  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    field.appendChild(item);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
