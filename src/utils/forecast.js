const request = require('postman-request');


const weather = function(location, callback){
    const url = 'https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/' + location.globalIdLocal + '.json';
    request({url, json: true}, function(error, {body}){
        if(error){
            callback('There was a problem fetching the weather data!', undefined);
        }
        else if(!body.data){
            callback('There was a problem fetching the weather data!', undefined);
        }
        else{ 
            callback(undefined, {
                local: location.local,
                tempMax: body.data[1].tMax,
                tempMin: body.data[1].tMin
            })
        }
    })
}

module.exports = weather;