const axios = require('axios')
const yargs = require('yargs')


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address', 
            describe: 'Address to fetch weather for', 
            string: true,
            default: 'Delhi, India'
        }
    })
    .help()
    .alias('help', 'h')
    .argv
    
var encodedAddress = encodeURIComponent(argv.address)
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error ('Unable to find that address')
    }
    else if (response.data.status === 'OVER_QUERY_LIMIT') {
        throw new Error ('You have exceeded your daily quota')
    }
    else if(body.status === 'OVER_QUERY_LIMIT') {
        throw new Error ('You have exceeded your daily quota')
    }
    else if (body.status === 'REQUEST_DENIED') {
        throw new Error(`You found AREA 52 - Your request was denied.`)
    }
    else if (body.status === 'INVALID_REQUEST') {
        throw new Error(`Some manadatory parameters missing`)
    } 
    else if (body.status === 'UNKNOWN_ERROR') {
        throw new Error(`Opps. Shit happens. Try again please!`)
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/54b898a702b26084b9889e95f9cd1094/${lat},${lng}`
    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherUrl)

}).then(() => {
    var temperature  = response.data.currently.temperature
    var apparentTemperature = response.data.currently.apparentTemperature
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`)
       
}).catch((err) => {
    if (err.code === 'ENOTFOUND') {
        console.log('Unable to connect to google servers')
    }
    else {
        console.log(err.message)
    }
})
