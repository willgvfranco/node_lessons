import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import hbs from 'hbs';
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const app = express();

// Define paths for Express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __public = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(__public));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App!',
        name: 'William'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {})
})

app.get('/help', (req, res) => {
    res.render('help', {})
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Its snowing',
//         location: 'Rio de Janeiro'
//     })
// })


app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: "404: Not Founded"
    })
})
app.listen(3000, () => {
    console.log('server is up on port 3000.')
})