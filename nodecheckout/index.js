const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
// store config variables in dotenv
require('dotenv').config();
const cors = require('cors');
const path = require('path');

// ****** allow cross-origin requests code START ****** //
app.use(cors()); // uncomment this to enable all CORS and delete cors(corsOptions) in below code
const allowedOrigins = process.env.allowedOrigins.split(',');
/**
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
 */
// ****** allow cross-origin requests code END ****** //

// app Routes
// create application/json parser
const jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

var dbFunctions = require('./util');

app.get('/countries', function (req, res) {
    dbFunctions.makeRequest("get", "/v1/data/countries").then((item) => {
        res.send(JSON.stringify(item.body.data))
    })
});

app.post('/checkout', jsonParser, function (req, res) {
    var _completeUrl = process.env.baseAPIUrl + "/complete";
    var bd = { "amount": 9.99, "country": "US", "currency": "USD", "requested_currency": "USD", "complete_checkout_url": _completeUrl };
    if (req.body.amount !== null) { bd.amount = req.body.amount; }
    if (req.body.country !== null) { bd.country = req.body.country; }
    if (req.body.currency !== null) { bd.currency = req.body.currency; }
    if (req.body.requested_currency !== null) { bd.requested_currency = req.body.requested_currency; }
    if (req.body.complete_checkout_url !== null) { bd.complete_checkout_url = req.body.complete_checkout_url; }
    dbFunctions.makeRequest("post", "/v1/checkout", bd).then((item) => {
        res.send(JSON.stringify(item.body))
    })
});
app.get('/ad/:id', function (req, res) {
    varId = req.params.id;
    res.render(path.join(__dirname, './views/ad'), { varCheckoutId: varId })
});
app.get('/invoice/:id', function (req, res) {
    varId = req.params.id;
    res.render(path.join(__dirname, './views/ad'), { varCheckoutId: varId })
});
app.get('/complete', function (req, res) {
    res.sendFile(path.join(__dirname, './views/complete.html'));
});
app.use('/', (req, res) => res.send("Welcome Rapyd Payment solutions checkout !"));
app.listen(process.env.PORT, () => console.log('Elish Enterprise Rapyd Payment solutions is ready on localhost:' + process.env.PORT));
