const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log =  `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use((req, res, next)=>{

//     res.render('maintenence.hbs');

// });

hbs.registerHelper('textreturn', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
    res.render('welcome.hbs', {
        welcomeMessage: 'Welcome to the home page :)',
        pageTitle:'Home Page',
        currentYear: new Date().getFullYear()
    });
});

app.use(express.static(__dirname +'/public'));

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle:'About Page',
        currentYear: new Date().getFullYear()
    });
});
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
});