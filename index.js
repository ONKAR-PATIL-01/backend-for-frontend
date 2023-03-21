const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const survey = require('./routes/survey')
const response=require('./routes/response')
const app = express()
app.use(cors());
app.use(express.json())

//Define Routers
app.use('/survey', survey)
app.use('/response',response)

app.listen(process.env.local_port, () => {
    console.log(`Server Running at localhost:${process.env.local_port}`)
})