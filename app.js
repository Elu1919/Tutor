// dotenv
if (process.env.NODE.ENV !== 'production') {
  require('dotenv').config()
}

// require
const express = require('express')
const handlebars = require('express-handlebars')

const { pages } = require('./routes')
const db = require('./models')

// setting
const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', handlebars.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(pages)

// listening on app
app.listen(port, () => {
  console.info(`Express is running on http://localhost:${port}`)
})