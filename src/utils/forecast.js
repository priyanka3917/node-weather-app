const request = require('request')
const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8ace562613bcb9896b7b38cd244000c2&query=' +latitude+ ',' +longitude +'units=f'
    request({ url, json: true }, (error, { body }) => {
    if (error) {
        callback('unable to connect', undefined)
    } else if (body.error) {
        callback('unable to connect.Try again later', undefined)
    }
    else {
        callback(undefined,body.current.weather_descriptions[0] + ' .It is currently ' +body.current.temperature + ' degrees out')
    }
    
})
}

module.exports=forecast