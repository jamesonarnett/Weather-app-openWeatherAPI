
const https = require('https');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res) {  
    const query = req.body.cityName;
    const appId = 'd0a4bd3237446cb224ca3dce0eed1a1a'
    const units = 'imperial'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' 
    + query + '&units=' + units + '&appid=' + appId;

    https.get(url, function(response) {
        console.log(response.statusCode);
        
        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h2> The weather conditions out are currently: " + description + "</h2>");
            res.write("<p> The current temperature in " + query + " is " + temp + "</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })   
    })
})


app.listen(3000, function() {
    console.log('Server is running on port 3000');
})