"use strict";
const request = require('request');
var shortid = require("shortid")

class EMQXService {
    static disconnectClient(clientId) {
        const apiUrl = `${process.env.EMQX_API_URL}/clients/${clientId}`
        request.delete(apiUrl, {
            "auth": {
                'user': process.env.EMQX_APP_KEY,
                'pass': process.env.EMQX_APP_SECRET,
                'sendImmediately': true
            }
        }, function (error, response, body) {
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        })
    }

    static publishTo({topic, payload, qos = 1, retained = false}) {
        const apiUrl = `${process.env.EMQX_API_URL}/publish`
        request.post(apiUrl, {
            "auth": {
                'user': process.env.EMQX_APP_KEY,
                'pass': process.env.EMQX_APP_SECRET,
                'sendImmediately': true
            },
            json:{
                topic: topic,
                payload: payload,
                qos: qos,
                retain: retained
            }
        }, function (error, response, body) {
            console.log(`published to ${topic}`)
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        })
    }
}

module.exports = EMQXService