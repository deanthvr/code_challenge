require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const app = express();

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT

const apiRoutes = require('./routes/apiRoutes')

app.use('/api', apiRoutes)


app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
})

module.exports = app

