const express = require('express');
const app = express();
const connectDB = require("../DevConnect/config/db")
const path = require('path')


//connect database
connectDB()


const PORT = process.env.PORT || 5000

//make body into json -> can get data from body
app.use(express.json({ createIndexes: true }))

app.use("/api/users", require("../DevConnect/routers/api/users"))
app.use("/api/auth", require("../DevConnect/routers/api/auth"))
app.use("/api/profile", require("../DevConnect/routers/api/profile"))
app.use("/api/posts", require("../DevConnect/routers/api/posts"))


//server static assets in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


app.listen(PORT, () => { console.log("Server is running at" + PORT) })