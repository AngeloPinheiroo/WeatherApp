const request = require('postman-request');


const location = function(name, callback){
    const url = 'https://api.ipma.pt/open-data/distrits-islands.json';
    request({url, json: true}, function(error, {body}){
        if(error){
            callback('There was a problem fetching the location data!', undefined);
        }
        else{
            const res = body.data.find((cidade) => cidade.local == name);
            if(res) callback(undefined, res);
            else callback('There was a problem fetching the location data!', undefined);
        }
    })
}

module.exports = location;