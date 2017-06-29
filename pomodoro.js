// User Story: I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.

// User Story: I can reset the clock for my next pomodoro.

// User Story: I can customize the length of each pomodoro.

let toaster = new CountDownTimer(10);
toaster.Start(12);

class CountDownTimer {
    constructor (duration){
        this.duration = duration;
        this.isRunning = false;
    }

    Start(time){
        console.log("classes!")
    }
}



