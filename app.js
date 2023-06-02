const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express() // Initializing express
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8001;
const connectDB = require('./config/db')

// routes
const userRouter = require('./routes/user')

// dB connect
connectDB()

const { errorHandler } = require('./middlewares/error-middleware')

// Middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', userRouter);

app.use(errorHandler)


// Listen
app.listen(port, () => {
    console.log(`server is running in port ${port}`);
});
