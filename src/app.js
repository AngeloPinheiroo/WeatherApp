const path = require('path');

const express = require('express');
const hbs = require('hbs');

const location = require('./utils/geocode.js');
const weather = require('./utils/forecast.js');

const app = express();
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirPath));

app.get('', function(req, res){
    res.render("index", {
        title: 'Weather App',
        name: 'Ângelo'
    });
})

app.get('/about', function(req, res){
    res.render("about", {
        title: 'About me',
        name: 'Ângelo Pinheiro'
    });
})

app.get('/help', function(req, res){
    res.render("help", {
        title: 'Help section',
        name: 'Ângelo Pinheiro',
        helpText: 'This is some helpfull text, hopefully'
    });
})

app.get('/weather', function(req, res){
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    const addressName = req.query.address; 
    location(addressName, function(error, info){
        if(error) return res.send({        
            error: error
        });
    
        weather(info, function(error2, {local, tempMax, tempMin} = {}){
            if(error2) return res.send({        
                error: error2
            });
    
            console.log(local)
            res.send({        
                local,
                tempMax,
                tempMin
            });
        })
    })
});

app.get('/products', function(req, res){
    if(!req.query.search){
        return res.send({
            error: 'Search term needed'
        })
    }
    res.send({
        products: []
    });
});

app.get('/help/*', function(req, res){
    res.render('notFound', {
        title: 'Sorry',
        name: 'Ângelo Pinheiro',
        errorText: 'Help article not found!'
    });
});

app.get('*', function(req, res){
    res.render('notFound', {
        title: 'Sorry',
        name: 'Ângelo Pinheiro',
        errorText: 'Page not found!'
    });
});

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});