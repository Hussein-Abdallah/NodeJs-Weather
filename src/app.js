const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express();

// assign heroku port or local port
const port = process.env.PORT || 3000;

//Define Paths for Express Config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlbars engine and views location
// inform NodeJs that we are using HandleBars
app.set('view engine', 'hbs')
//In case we change the dir name of handlebars folder from views to something else
app.set('views', viewsPath)
// Define handlebars partials to be used
hbs.registerPartials(partialsPath)

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// inform NodeJs that we have a static director that contains our public files
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Hussein'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Hussein'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Hussein',
        message: 'This is the help page!'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (err, { latitude, longitude, city } = {}) => {
        if (err) {
            return res.send({
                error: err
            });
        }
        forecast(longitude, latitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                });
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: city
            })
        })
    })
})

// Post Method for the form (testing)
/*app.post('/weather', (req, res) => {
    if (!req.body.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.body.address, (err, { latitude, longitude, city } = {}) => {
        if (err) {
            return res.send({
                error: err
            });
        }
        forecast(longitude, latitude, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err
                });
            }
            res.send({
                address: req.body.address,
                forecast: forecastData,
                location: city
            })
        })
    })
})*/

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: '404 Page',
        name: 'Hussein',
        error: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404 Page',
        name: 'Hussein',
        error: 'Page not found!'
    })
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})