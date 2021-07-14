const express = require('express')
const env = require('dotenv')
const morgan = require('morgan')
const mongoose = require('mongoose');
const multer  = require('multer')
const path = require('path')

const authRoute = require('./router/auth')
const userRoute = require('./router/users')
const postRoute = require('./router/posts')

const app = express()
morgan('tiny')
env.config()

//Body parser
app.use(express.json())

app.use("/images", express.static(path.join(__dirname , "public/images")))

//Upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, "public/images")  
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
})

const upload = multer({storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        res.status(200).json("File uploaded Successfully")
    } catch (error) {
        console.log(error)
    }
})

//Connect to DB
mongoose.connect(process.env.MONGODB_URI_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => console.log("Connected to DB"), err => console.log(error))


//routes
app.use('/api/auth/', authRoute)
app.use('/api/users/', userRoute)
app.use('/api/posts/', postRoute)



app.listen(3000, () => console.log("server running..."))