const mongoose = require('mongoose')

const mongoURI = process.env.MONGODBURL

try{
    mongoose.connect(mongoURI, { bufferCommands: false }, null)
} catch (error) {
    console.log(error)
}

module.exports = { mongoose }