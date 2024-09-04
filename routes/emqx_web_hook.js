var express = require('express');
var router = express.Router();
var Device = require("../models/device")
var messageService = require("../services/message_service")

router.post("/", function (req, res) {
    switch (req.body.event){
        case "client.connected":
            Device.addConnection({
                client_id: req.body.clientid,
                username: req.body.username,
                connected_at: req.body.connected_at,
                keepalive: req.body.keepalive,
                proto_ver: req.body.proto_ver,
                ipaddress: req.body.peername.split("/")[0]
            })
            break
        case "client.disconnected":
            Device.removeConnection({
                client_id: req.body.clientid,
                username: req.body.username,
                disconnected_at: req.body.disconnected_at
            })
            break;
        case "message.publish":
            messageService.dispatchMessage({
                topic: req.body.topic,
                payload: req.body.payload,
                ts: req.body.timestamp
            })
    }
    res.status(200).send("ok")
})

module.exports = router
