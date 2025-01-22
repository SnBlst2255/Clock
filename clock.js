export default class Clock {
    getTime() {
        const date = new Date();

        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const result = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return result;
    }

    getDate() {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const result = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
        return result;
    }
}
