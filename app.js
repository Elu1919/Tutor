// dotenv
if (process.env.NODE.ENV !== 'production') {
  require('dotenv').config()
}

// require
const express = require('express')
const router = require('./routes')

// setting
const app = express()
const port = process.env.PORT || 3000

app.use(router)

// listening on app
app.listen(port, () => {
  console.info(`Express is running on http://localhost:${port}`)
})