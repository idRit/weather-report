async function main() {
    let data = await (await fetch('/api/getWeather/' + localStorage.city)).json();
    localStorage.weatherData = JSON.stringify(data);
    let src = await (await fetch('/api/getIcon/' + data.weather[0].icon)).json();
    let imgData;
    if (isDay()) {
        imgData = await (await fetch('/api/getBackgroundImage/' + data.weather[0].main + '/day')).json();
    } else {
        imgData = await (await fetch('/api/getBackgroundImage/' + data.weather[0].main + '/night')).json();
    }

    let randomNumber = Math.floor(Math.random() * imgData.length-1);

    document.querySelector('.container').style.backgroundImage = "url('" + imgData[randomNumber].urls.regular + "')";

    // document.getElementById('area').innerHTML = localStorage.city + ", " + localStorage.countryCode;
    // document.getElementById('desc').innerHTML = JSON.parse(localStorage.weatherData).weather[0].main;
    let main = JSON.parse(localStorage.weatherData).main;
    document.getElementById('bigFeelsLike').innerHTML = (main.feels_like - 273.15).toFixed(0) + "&deg;C";
    // document.getElementById('hi').innerHTML = "High: " + (main.temp_min - 273.15) + "&deg;C";
    // document.getElementById('lo').innerHTML = "Low: " + (main.temp_max - 273.15) + "&deg;C";

    localStorage.weatherData = JSON.stringify(data);
    document.querySelector('#status').src = src.url;
    document.querySelector('#status').style.display = "block";
}

function isDay() {
    const hours = (new Date()).getHours();
    return (hours >= 6 && hours < 18);
}