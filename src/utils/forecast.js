const request = require('request');
console.log(' ia m in forcast.js');
const forecast = (latitude, longtitude, callback) => {
  // callback can be called  with anything
  const url =
    'http://api.weatherstack.com/current?access_key=b61d553cc58c413aa0af8eca01ec7bb1&query=' +
    latitude +
    ',' +
    longtitude +
    '&units=f';
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('unable to find location', undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently  ' +
          body.current.temperature +
          ' degrees out. It feels like  ' +
          body.current.feelslike +
          '  degrees outside.' +
          ' the humidity outside is  ' +
          body.current.humidity
      );
    }
  });
};
module.exports = forecast;
