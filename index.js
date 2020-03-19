const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({ accessKey: "974883795e53ac1c1ef6458d25b7955bcfb0a93dab140a4196e3bb17cceae8b7" });

global.fetch = fetch;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/client/');
});

app.get('/api/getWeather/:city', async (req, res) => {
    let city = req.params.city;
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=";
    let key = "712de20dc7e99e4a470d93dee98a7876";
    let apiResponse = await (await fetch(url + key)).json();
    return res.json(apiResponse);
});

app.get('/api/getIcon/:id', async (req, res) => {
    let icon = req.params.id;
    let url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    // let apiResponse = await (await fetch(url)).text();
    return res.json({
        url
    });
});

app.get('/api/getBackgroundImage/:status/:time', async (req, res) => {
    let apiResponse = await (await (unsplash.search.photos("weather " + req.params.status + " " + req.params.time, 1, 100, { orientation: "portrait" }))).json();
    console.log(apiResponse);
    return res.json(apiResponse.results);
});

app.listen(process.env.PORT || 3000);