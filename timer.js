class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
      const startButton = document.querySelector("#start");
      const pauseButton = document.querySelector("#pause");
      const myAudio = document.getElementById("myAudio");
      myAudio.volume = 0.2;
      myAudio.play();
    }
    this.tick();
    this.interval = setInterval(this.tick, 20);
    startButton.disabled = true;
    startButton.classList.add("toggled");
    pauseButton.classList.remove("toggled");
  };

  pause = () => {
    myAudio.pause();
    clearInterval(this.interval);
    startButton.disabled = false;
    startButton.classList.remove("toggled");
    pauseButton.classList.add("toggled");
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
