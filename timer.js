export default class Timer {
    isRunningTimer = false;
    intervalTimer = null;
    initialDuration = 0;
    startTime = 0;
    pausedTime = 0;

    startTimer(h, m, s) {
        this.initialDuration = h * 3600000 + m * 60000 + s * 1000;
        this.startTime = Date.now();
        this.isRunningTimer = true;

        document.dispatchEvent(new CustomEvent('timeUpdate'));
        
        this.intervalTimer = setInterval(() => {
            this.updateRemainingTime();
        }, 1000);
    }

    updateRemainingTime() {
        const elapsed = Date.now() - this.startTime;
        const remainTime = Math.max(0, this.initialDuration - elapsed);

        if (remainTime <= 0) {
            this.resetTimer();
            document.dispatchEvent(new CustomEvent('timerStopped'));
        }else if(remainTime > 0){
            document.dispatchEvent(new CustomEvent('timeUpdate'));
        }
    }

    pause() {
        this.pausedTime = Date.now() - this.startTime;
        this.isRunningTimer = false;
        clearInterval(this.intervalTimer);
    }

    continue() {        
        this.startTime = Date.now() - this.pausedTime;
        this.isRunningTimer = true;
        
        this.intervalTimer = setInterval(() => {
            this.updateRemainingTime();
        }, 100);
    }

    resetTimer() {
        this.isRunningTimer = false;
        this.initialDuration = 0;
        this.startTime = 0;
        this.pausedTime = 0;
        clearInterval(this.intervalTimer);
    }

    getTime() {
        const elapsed = this.isRunningTimer 
            ? Date.now() - this.startTime 
            : this.pausedTime;
            
        const remainTime = Math.max(0, this.initialDuration - elapsed);
        const totalSeconds = Math.ceil(remainTime / 1000);

        return {
            hours: String(Math.floor(totalSeconds / 3600)).padStart(2, '0'),
            mins: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'),
            secs: String(totalSeconds % 60).padStart(2, '0')
        };
    }
}