const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FpbmFiZGFsbGFoODQiLCJhIjoiY2s2azlrdGV1MDIxMTNkdTk1ajU2ajg1NCJ9.B7Cn033APR5cruMgGXTjLQ`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback('unable to connect to weather service!');
        } else if (body.message) {
            callback(body.message);
        } else if (body.features.length === 0) {
            callback('Unable to find location!');
        } else {
            const city = body.features[0].place_name
            const latitude = body.features[0].center[0]
            const longitude = body.features[0].center[1]
            //console.log(location.place_name);
            callback(undefined, { latitude, longitude, city })
        }
    })

};

module.exports = geocode;