import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'

const address = process.argv[2]
console.log(address)
if (address) {

    geocode(address, (error, data) => {
        if (error) {

            console.log('Error', error)
        } else {
            console.log('Data', data)
            forecast(data.latitude, data.longitude, (error, data) => { error ? console.log('Error', error) : console.log('Data', data) })
        }
    })
} else {
    console.log('Invalid arg')
}
