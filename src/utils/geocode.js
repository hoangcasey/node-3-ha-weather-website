const request = require('request');
console.log(' ia m in geocode .js');
const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoiaG9hbmdjYXNleSIsImEiOiJja2J6dG90aHEwYmszMnduMHE5cmRiNDYxIn0.I52HDpYb7HUdLGqDUN_hgg&limit=1';
  //console.log(url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!!!', undefined);
    } else if (body.features.length === 0) {
      callback('location not entered !!!', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geoCode;
