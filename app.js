// dotenv
if (process.env.NODE.ENV !== 'production') {
  require('dotenv').config()
}

// require
const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')

const { pages } = require('./routes')

// setting
const app = express()
const port = process.env.PORT || 3000

const SESSION_SECRET = 'secret'

app.engine('hbs', handlebars.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }))
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

app.use(pages)

// listening on app
app.listen(port, () => {
  console.info(`Express is running on http://localhost:${port}`)
})