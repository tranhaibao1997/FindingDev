const mongoose = require('mongoose');
const config = require('config');
const mongoConnectionString = config.get("mongoURL")


const connectDB = async() => {
    try {
        await mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        console.log("Connected to server")
    } catch (err) {
        console.log(err)
    }

}

module.exports = connectDB