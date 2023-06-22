const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');

const app = express();

let latestMessage = 'Test Published';

// MQTT client options
const clientOptions = {
    clientId: 'test', // Unique identifier for your client
    clean: true, // Clean session flag
};
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MQTT Client
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org:1883');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
});

mqttClient.on('error', (error) => {
    console.error('MQTT connection error:', error);
});

app.get('/message', (req, res) => {
    const message = {
        topic: 'MC/V1/testing',
        message: 'success'
    };
    res.json(message);
});

app.post('/publish', (req, res) => {
    const message = req.body.message;

    // Publish the message to MQTT broker
    //mqttClient.publish('MC/V1/testing', message);
    mqttClient.publish('MC/V1/testing3', message);
    latestMessage = message;
    //res.json({ message: latestMessage });
    res.status(200).send('Message published to MQTT');
});

app.listen(3009, () => {
    console.log('REST API server is running on port 3009');
});