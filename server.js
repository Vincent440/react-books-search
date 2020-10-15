const express = require('express')
const mongoose = require('mongoose')
const routes = require('./server/routes')
const app = express()
const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/googlebooks'
const mongooseConfig = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.connect(MONGODB_URI, mongooseConfig, error => console.log(error || '--> Connected to Database'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('server/client/build'))
}

app.use(routes)

app.listen(PORT, () => console.log(`-- API RUNNING ON ==> Port: ${PORT}`))
