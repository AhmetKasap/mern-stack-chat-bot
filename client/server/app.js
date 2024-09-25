require('express-async-errors');

const express = require('express')
const app = express()

//! Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//! Database Connection
const mongoDbConnection = require('./src/config/mongodb.connection')
mongoDbConnection()

//! Cors Options
const cors = require('cors')
const corsOptions = require('./src/middlewares/lib/cors')
app.use(cors(corsOptions))


//! Routes and ErrorHandler
const routes = require('./src/routes/index.routes')
app.use('/api/v1', routes)


app.use((req,res, next) => {
    res.send('not found url')
    next()
})

const errorHandler = require('./src/middlewares/errorHandler')
app.use(errorHandler)

app.listen(process.env.PORT || 5001, () => {
  console.log(`Server is Running on port ${process.env.PORT || 5001}`)
})



