window.onload = function (){
    setInterval(function(){
        updateTime();
        updateDate();
    }, 1000);
}

function updateTime(){
    const date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    document.getElementById("current-time").innerHTML = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateDate(){
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    document.getElementById("current-date").innerHTML = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
}
