const express = require('express')
const env = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose');

const authRoute = require('./router/auth')
const userRoute = require('./router/users')
const postRoute = require('./router/posts')

const app = express()
morgan('tiny')
env.config()

//Body parser
app.use(express.json())

//Connect to DB
mongoose.connect(process.env.MONGODB_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log("Connected to DB"), err => console.log(error))

app.use('/api/auth/', authRoute)
app.use('/api/users/', userRoute)
app.use('/api/posts/', postRoute)



app.listen(3000, () => console.log("server running..."))