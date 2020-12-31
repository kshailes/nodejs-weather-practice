const request = require('postman-request')

const MAP_BOX_TOKEN = "pk.eyJ1Ijoia3NoYWlsZXNoIiwiYSI6ImNrajhqeXVscDJqNGsyemxncTY3N2w1dmwifQ.tW16RxBcu2SVb-MPiUZo-Q"
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=" + MAP_BOX_TOKEN

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('no geocode service available..', undefined)
        } else if (response.body.features.length === 0) {
            callback('no info found for given location', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = {
    geocode:geocode
}