require('dotenv').config()
const express = require('express')
const app = express()
const route = require('./routes/index')
const port = 3000
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/hacktivgit', {useNewUrlParser: true})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/', route)
app.listen(port, () => {console.log(`Listening on port ${port}!`)})