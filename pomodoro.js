// User Story: I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
// User Story: I can reset the clock for my next pomodoro.
// User Story: I can customize the length of each pomodoro.

// TIL: An important difference between function declarations and class declarations is that function declarations are hoisted and class declarations are not.
// You first need to declare your class and then access it.
class CountDownTimer {
    constructor(duration, display) {
        this.duration = duration; // in seconds
        this.isRunning = false;
        this.display = display;
        this.intervalID = null;
        this.startTime = null;
        this.hasBeenPaused = false;
        this.originalDuration = 0;
    }

    changeDuration(duration){
        this.duration = duration;
    }

    start() {
        if (this.isRunning) { return; }
        if (!this.hasBeenPaused) {this.originalDuration = this.duration;}
        this.startTime = new Date();
        this.isRunning = true;
        let timer = this.duration;
        this.intervalID = setInterval(function () {
            let minutes = parseInt(timer / 60, 10);
            let seconds = parseInt(timer % 60, 10);
            minutes < 10 ? minutes = "0" + minutes : minutes;
            seconds < 10 ? seconds = "0" + seconds : seconds;

            $(display).html(minutes + ":" + seconds);
            timer == 0 ? this.isRunning = false : timer--;
        }, 1000);
    }

    pause() {
        if (!this.isRunning) { return; }
        this.hasBeenPaused = true;
        this.isRunning = false;
        this.duration = this.duration - Math.floor((new Date() - this.startTime)/1000);
        clearInterval(this.intervalID);
    }

    unpause() {
        if (this.isRunning) { return; }
        this.isRunning = false;
        this.start();
    }

    restart(){
        this.hasBeenPaused = true;
        clearInterval(this.intervalID);
        this.duration = this.originalDuration;
        this.isRunning = false;
        this.start();
    }

    stop(){
        this.isRunning = false;
        this.duration = 25 * 60;
    }
}
let display = '#timer';
let dur = 25;
let toaster = new CountDownTimer(25*60, display);

$('#pause').click(function (e) {
    toaster.pause();
});

$('#unpause').click(function (e) {
    toaster.unpause();
});

$('#restart').click(function(e){
    toaster.restart();
});

$('#minusMin').click(function(e){
    if (toaster.isRunning)
    {
        return;
    }    
    dur--;
    toaster.changeDuration(dur * 60);
    $('#timer').html(dur+":00");
});
$('#plusMin').click(function(e){
    if (toaster.isRunning)
    {
        return;
    }
    dur++   
    toaster.changeDuration(dur * 60);
    $('#timer').html(dur+":00");
});

$('#start').click(function(e){
    toaster.start();
});

