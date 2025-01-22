export default class StopWatch {

    isRunningStopwatch = false;
    intervalStopwatch;
    startTime = 0;
    elapsedTime = 0;

    lastLapTime = 0;
    lapCount = 0;

    start() {
        this.isRunningStopwatch = true;
        this.startTime = new Date().getTime() - this.elapsedTime;
    }

    getTime() {
        const now = new Date().getTime();
        this.elapsedTime = now - this.startTime;

        const ms = Math.floor((this.elapsedTime % 1000) / 10);
        const sec = Math.floor((this.elapsedTime / 1000) % 60);
        const min = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
        const hour = Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 24);

        const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        return time;
    }

    reset() {
        this.elapsedTime = 0;
        this.lastLapTime = 0;
        this.lapCount = 0;
        this.isRunningStopwatch = false;
    }

    pause() {
        this.isRunningStopwatch = false;
    }

    addLap() {
        const now = new Date().getTime();
        const lapTime = now - this.startTime - this.lastLapTime;

        const ms = Math.floor((lapTime % 1000) / 10);
        const sec = Math.floor((lapTime / 1000) % 60);
        const min = Math.floor((lapTime / (1000 * 60)) % 60);
        const hour = Math.floor((lapTime / (1000 * 60 * 60)) % 24);

        this.lastLapTime += lapTime;

        const formattedLapTime = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
        const overallTime = `${Math.floor((this.elapsedTime / (1000 * 60 * 60)) % 24).toString().padStart(2, '0')}:${Math.floor((this.elapsedTime / (1000 * 60)) % 60).toString().padStart(2, '0')}:${Math.floor((this.elapsedTime / 1000) % 60).toString().padStart(2, '0')}.${Math.floor((this.elapsedTime % 1000) / 10).toString().padStart(2, '0')}`;

        this.lapCount++;

        return {
            lapTime: formattedLapTime,
            overall: overallTime,
            laps: this.lapCount,
        };
    }
}
