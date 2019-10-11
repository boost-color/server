if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const routes = require('./routes')
require('./config/mongoose')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const PORT = process.env.PORT

// middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

// main route
app.get('/', (req, res) => {
  res.send('Deploy Server Succesfully')
})
app.use('/', routes)

// middleware error handler
app.use(errorHandler)

// start server
app.listen(PORT, () => console.log(`SERVER LISTENING ON PORT: ${PORT}`))

