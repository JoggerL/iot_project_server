const mongoose = require("mongoose")

const RecordSchema = new mongoose.Schema({
    data: [Number],
    deviceName: String,
    ts: Number,
})

const Record = mongoose.model("Record", RecordSchema, "record")
module.exports = { Record }