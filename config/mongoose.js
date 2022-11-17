const mongoose = require('mongoose')

const mongoURI = process.env.MONGODBURL

try{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, bufferCommands: false })
} catch (error) {
    console.log(error)
}

module.exports = { mongoose }