const mongoose = require("mongoose")
const {SchemaTypes, mongo} = require("mongoose");

const schema = mongoose.Schema({
    _id: {type: SchemaTypes.ObjectId},
    data: [Number],
    deviceName: String,
    ts: Number,
})

const ECG = mongoose.model("ECG", schema)
module.exports = { ECG }