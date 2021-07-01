const express = require('express')
const env = require('dotenv')
const morgan = require('morgan')

const app = express()
morgan('tiny')
env.config()



app.listen(3000, () => console.log("server running..."))