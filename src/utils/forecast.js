const request = require('postman-request')

const ACCESS_KEY = "f31246add24f6826f345f0d08dcb492c"
const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=" + ACCESS_KEY + "&query=" + latitude + "," + longitude
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Forecast Service not available!', undefined)
        } else if (response.body.error) {
            callback('Wrong input given..', undefined)
        } else {
            callback(undefined, {
                current_temperature: response.body.current.temperature,
                feels_like_temperature: response.body.current.feelslike
            })
        }
    })
}

module.exports = {
    forecast:forecast
}