var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const deviceACLSchema = new Schema({
    broker_username: String,
    permission: String,
    action: String,
    topics: Array,
    qos: Number,
    retain: Boolean
}, { collection: 'device_acl' })

const DeviceACL = mongoose.model("DeviceACL", deviceACLSchema);

module.exports = DeviceACL
