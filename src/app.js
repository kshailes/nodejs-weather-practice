const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

const port = process.env.PORT || 3000 // on heroku, they will set its on port


// const publicDirectoryPath = path.join(__dirname, '../public')
// app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.send('Home Page!! Local server')
})

app.get('/help', (req, res) => {
    res.send("Help Page!!!!!")
})


app.get('/about', (req, res) => {

    if (!req.query.search) {
        return res.send("query term search missing")
    }
    const searchTerm = req.query.search
    res.send({
        serachTerm: searchTerm,
        created_by: "Shailesh"
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send("Location query term is a must")
    }

    const location = req.query.location
    geocode.geocode(location, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast.forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send(
                data.location + " is at latitude " + data.latitude + " and longitude " + data.longitude + ". Temperature is " + forecastData.current_temperature
            )
        })
    })

})

app.get('*', (req, res) => {
    res.send("My 404 Page")
})

app.listen(port, () => {
    console.log("Server running at port " + port)
})