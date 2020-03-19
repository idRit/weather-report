async function main() {
    let data = await (await fetch('/api/getWeather/' + localStorage.city)).json();
    console.log(data);
    let src = await (await fetch('/api/getIcon/' + data.weather[0].icon)).json();
    console.log(src);
    
    let imgData;
    if (isDay()) {
        imgData = await (await fetch('/api/getBackgroundImage/' + data.weather[0].main + '/day')).json();
    } else {
        imgData = await (await fetch('/api/getBackgroundImage/' + data.weather[0].main + '/night')).json();
    }

    let randomNumber = Math.floor(Math.random() * 9);
    // console.log(imgData[randomNumber].cover_photo.urls.full);
    console.log(imgData[randomNumber].urls.regular);

    document.querySelector('.container').style.backgroundImage = "url('" + imgData[randomNumber].urls.regular + "')";

    localStorage.weatherData = JSON.stringify(data);
    document.querySelector('#status').src = src.url;
    document.querySelector('#status').style.display = "block";
} //load data

(function () {
    function checkTime(i) {
        return (i < 10) ? "0" + i : i;
    }

    function startTime() {
        var today = new Date(),
            h = checkTime(today.getHours()),
            m = checkTime(today.getMinutes()),
            s = checkTime(today.getSeconds());
        // document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
        t = setTimeout(function () {
            startTime()
        }, 500);
    }
    startTime();
})(); //time

(function () {
    document.getElementById('area').innerHTML = localStorage.city + ", " + localStorage.countryCode;
})(); //location

(function () {
    document.getElementById('desc').innerHTML = JSON.parse(localStorage.weatherData).weather[0].main;
    let main = JSON.parse(localStorage.weatherData).main;
    document.getElementById('bigFeelsLike').innerHTML = (main.feels_like - 273.15).toFixed(0) + "&deg;C";
    document.getElementById('hi').innerHTML = (main.temp_min - 273.15) + "&deg;C";
    document.getElementById('lo').innerHTML = (main.temp_max - 273.15) + "&deg;C";
})(); //weather details

function isDay() {
    const hours = (new Date()).getHours();
    return (hours >= 6 && hours < 18);
}