// const { reset } = require("browser-sync");

let countdown;
const timerDisplay = document.querySelector('.display_time-left');
const endTime = document.querySelector('.display_end-time');
const buttons = document.querySelectorAll('[data-time]');
const pauseButton = document.querySelector('.pause_button');
// const restartButton = document.querySelector('.restart_button');
const stopButton = document.querySelector('.stop_button');

function timer(seconds) {
  // 현재 작동하는 타이머를 리셋한다
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // 멈춰야 할 때를 알리는 코드
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const adjustedSeconds = remainderSeconds < 10 ? '0' : '';
  const display = `${minutes}:${adjustedSeconds}${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;

  if (display === (`0:00`)) {
    alert('알람이 종료되었습니다.')
  }
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();

  const dayNight = (hour >= 12) ? '오후' : '오전'
  // const adjustedHour = hour < 10 ? '0' : ''
  // const adjustedHour2 = hour > 12 ? hour -12 : hour
  // const adjustedMinutes = minutes < 10 ? '0' : ''
  const noon = hour > 12 ? hour -12 : hour === 0 ? hour +12 : hour;
  /*
  let noonAndMidnight;
     const noonMidnight = () => {
      if (hour > 12) {
        noonAndMidnight = hour -12;
      } else if (hour === 0) {
        noonAndMidnight = hour +12;
      } else {
        noonAndMidnight = hour;
      }
      return (noonAndMidnight);
    };  
  */
  
  // endTime.textContent = `${dayNight} ${adjustedHour}${adjustedHour2}시 ${adjustedMinutes}${minutes}분에 만나요 ^-^`;
  endTime.textContent = `${dayNight} ${noon}시 ${minutes}분에 만나요 ^-^`;
}


function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

function pauseTimer() {
  clearInterval(countdown);
  countdown = null;
}

// function restartTimer() {}

function stopTimer() {
  clearInterval(countdown);
  timerDisplay.textContent = `0:00`
  endTime.textContent = `스탑워치가 종료되었습니다.`
}

pauseButton.addEventListener('click', pauseTimer);
// restartButton.addEventListener('click', restartTimer);
stopButton.addEventListener('click', stopTimer);


buttons.forEach(button => button.addEventListener('click', startTimer))


document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset();
});