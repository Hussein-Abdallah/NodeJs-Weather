const request = require('postman-request');

const forecast = (lon, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=bb62b94959bb16d64cf13314dfe1c2e6&query=${lon},${lat}`
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('unable to connect to weather service!');
            return;
        }
        if (body.error) {
            callback(`Error: ${body.error.info}`);
            return;
        }
        const current = body.current;
        callback(undefined, `${current.weather_descriptions[0]}. it is currently ${current.temperature} degrees out and it feels like ${current.feelslike} degrees. There is a ${current.precip}% chance of rain.`);
    })
}

module.exports = forecast;



