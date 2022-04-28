require('./model/db');

const express = require('express');
const employeeController = require('./Controllers/employeeController');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const bodyParser = require('body-parser');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: __dirname + '/views/layouts/'


}));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port:3000');
});
app.use('/employee', employeeController);