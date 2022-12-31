/*
 * @author Vitalie Plesco
 *
 *   Countdown timer app
 */

timer.v.newTimer = {
  setInterface: function () {
    const startBtn = document.getElementById("start");
    const stopBtn = document.getElementById("stop");
    const resetBtn = document.getElementById("reset");

    let ntimer;
    if (localStorage.getItem("practice")) {
      const practice = CTimer.convertJSON2Obj(localStorage.getItem("practice"));
      ntimer = new CTimer(practice);
      CTimer.displayTimer(practice);
    } else {
      CTimer.displayTimer(ntimer);
    }

    //display and pass the appropriate value to the page and timer
    const navBtn = document.querySelectorAll(".countdown li button");

    for (let i = 0; i < navBtn.length; i++) {
      navBtn[i].addEventListener("click", function () {
        if (navBtn[i].id === "practice") {
          if (ntimer.timerID) {
            CTimer.stop(ntimer);
          }
          const practice = CTimer.convertJSON2Obj(
            localStorage.getItem("practice")
          );
          CTimer.displayTimer(practice);
          ntimer = new CTimer(practice);
        } else if (navBtn[i].id === "short_break") {
          if (ntimer.timerID) {
            CTimer.stop(ntimer);
          }
          const shortBreak = CTimer.convertJSON2Obj(
            localStorage.getItem("shortBreak")
          );
          CTimer.displayTimer(shortBreak);
          ntimer = new CTimer(shortBreak);
        } else {
          if (ntimer.timerID) {
            CTimer.stop(ntimer);
          }
          const longBreak = CTimer.convertJSON2Obj(
            localStorage.getItem("longBreak")
          );
          CTimer.displayTimer(longBreak);
          ntimer = new CTimer(longBreak);
        }
      });
    }

    startBtn.onclick = function () {
      if (!ntimer.timerID) {
        CTimer.start(ntimer);
        console.log(ntimer);
      }
    };

    stopBtn.onclick = function () {
      CTimer.stop(ntimer);
    };

    resetBtn.onclick = function () {
      if (ntimer.timerID) {
        CTimer.stop(ntimer);
      }
      if (ntimer.name === "practice") {
        if (localStorage.getItem("practice")) {
          const practice = CTimer.convertJSON2Obj(
            localStorage.getItem("practice")
          );
          CTimer.displayTimer(practice);
        } else {
          CTimer.displayTimer(practice);
        }
      } else if (ntimer.name === "shortBreak") {
        if (localStorage.getItem("shortBreak")) {
          const shortBreak = CTimer.convertJSON2Obj(
            localStorage.getItem("shortBreak")
          );
          CTimer.displayTimer(shortBreak);
        } else {
          CTimer.displayTimer(shortBreak);
        }
      } else {
        if (localStorage.getItem("shortBreak")) {
          const longBreak = CTimer.convertJSON2Obj(
            localStorage.getItem("longBreak")
          );
          CTimer.displayTimer(longBreak);
        } else {
          CTimer.displayTimer(longBreak);
        }
      }
    };

    // open modal
    const openBtn = document.getElementById("open-btn");
    openBtn.addEventListener("click", timer.v.newTimer.openCloseModal);
  },

  openCloseModal: function () {
    // let openBtn = document.getElementById("open-btn");
    const closeBtn = document.getElementById("close-btn");
    const containerModal = document.getElementById("container-modal");

    containerModal.style.display = "block";

    const resetTimersBtn = document.getElementById("reset_btn");
    const saveBtn = document.getElementById("save_btn");

    //reset timers values to their defaults
    resetTimersBtn.onclick = function () {
      document.getElementById("input_practice").value = 25;
      document.getElementById("input_shortBreak").value = 5;
      document.getElementById("input_longBreak").value = 10;
    };

    //save new or default timer values in local storage
    saveBtn.onclick = function () {
      const practice = CTimer.convertJSON2Obj(localStorage.getItem("practice"));
      const shortBreak = CTimer.convertJSON2Obj(
        localStorage.getItem("shortBreak")
      );
      const longBreak = CTimer.convertJSON2Obj(
        localStorage.getItem("longBreak")
      );

      practice.seconds = document.getElementById("input_practice").value * 60;
      console.log(practice);
      shortBreak.seconds =
        document.getElementById("input_shortBreak").value * 60;
      longBreak.seconds = document.getElementById("input_longBreak").value * 60;

      localStorage.setItem("practice", CTimer.convertObj2JSON(practice));
      localStorage.setItem("shortBreak", CTimer.convertObj2JSON(shortBreak));
      localStorage.setItem("longBreak", CTimer.convertObj2JSON(longBreak));
      containerModal.style.display = "none";
      location.reload();
    };

    closeBtn.addEventListener("click", function () {
      containerModal.style.display = "none";
      location.reload();
    });
  },
};
