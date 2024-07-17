const express = require("express");
const request = require("request");

const app = express();

app.get("/", (req, res) => {
    let city = req.query.city;
    if (!city) {
        return res.send("Please provide a city ID.");
    }

    const apiKey = '1a3573f4026e3463d5382156dda56fd7';
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${apiKey}`;

    request(url, function (error, response, body) {
        if (error) {
            return res.send("An error occurred while fetching the weather data.");
        }

        let data;
        try {
            data = JSON.parse(body);
        } catch (e) {
            return res.send("Failed to parse the weather data.");
        }

        if (response.statusCode === 200) {
            res.send(`The weather in ${data.name} is ${data.weather[0].description}`);
        } else {
            res.send(`Failed to fetch weather data: ${data.message}`);
        }
    });
});

app.listen(3000, () => console.log("Server started on port 3000"));
