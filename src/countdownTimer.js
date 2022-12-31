/*
 * @author Vitalie Plesco
 *
 *   Countdown timer app
 */

function CTimer(timer) {
  this.name = timer.name;
  this.seconds = timer.seconds;
  this.timerID = null;
}

CTimer.start = function (timer) {
  if (timer.timerID === null) {
    timer.timerID = setInterval(CTimer.countdown, 1000, timer);
  }
};

CTimer.stop = function (timer) {
  window.clearInterval(timer.timerID);
  timer.timerID = null;
};

CTimer.countdown = function (timer) {
  if (timer.seconds > 0) {
    timer.seconds -= 1;
  }
  if (timer.seconds === 0) {
    window.clearInterval(timer.timerID);
    CTimer.playSound();
  }

  CTimer.displayTimer(timer);
};

CTimer.displayTimer = function (timer) {
  let hrsBox = document.getElementById("hours");
  let minBox = document.getElementById("minutes");
  let secBox = document.getElementById("seconds");

  let secCount = Math.floor(timer.seconds % 60);
  let minCount = Math.floor(timer.seconds / 60);
  let hrsCount = Math.floor(Math.floor(timer.seconds / 60) / 60);

  if (minCount >= 60) {
    minCount %= 60;
  }
  //add a 0 in front of the digit when the digit is less than 10
  if (secCount >= 10) {
    secBox.textContent = secCount;
  } else {
    secBox.textContent = "0" + secCount;
  }

  if (minCount >= 10) {
    minBox.textContent = minCount;
  } else {
    minBox.textContent = "0" + minCount;
  }

  if (hrsCount >= 10) {
    hrsBox.textContent = hrsCount;
  } else {
    hrsBox.textContent = "0" + hrsCount;
  }
};

CTimer.convertObj2JSON = function (timer) {
  const timerJSON = JSON.stringify(timer);
  return timerJSON;
};

CTimer.convertJSON2Obj = function (timer) {
  timer = JSON.parse(timer);
  return timer;
};

CTimer.playSound = function () {
  const alarm = new Audio("alarm/alarm-clock-beep.wav");
  alarm.play();
};

// set default timer values in local storage
if (!localStorage) {
  localStorage.setItem("practice", '{"name":"practice","seconds":1500}');
  localStorage.setItem("shortBreak", '{"name":"shortBreak","seconds":300}');
  localStorage.setItem("longBreak", '{"name":"longBreak","seconds":600}');
}
