var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mqtt = require('mqtt');
require('dotenv').config();

var app = express();

app.use((req, res, next) => {
    if (process.env.ALLOWED_ORIGINS.includes(req.headers.origin))
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-Websocket-User-Id, X-User-Language, Content-Type, Accept, Authorization');
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var client = mqtt.connect(process.env.MQTT_HOST, { username: process.env.MQTT_USER, password: process.env.MQTT_PASSWORD, port: process.env.MQTT_PORT });
setTimeout(() => {
    if (!client.connected)
        throw new Error('Le client MQTT ne parvient pas à se connecter');
}, 5000);

const router = express.Router();
app.use('/', router);
router.get('/api/newdeveloper', (req, res) => res.json({}))
require('./routes')(router, client);

module.exports = app;