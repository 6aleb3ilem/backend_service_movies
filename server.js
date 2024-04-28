const express = require('express')

const app = express()

const logger = require('morgan')

const PORT = process.env.PORT || 3000

const db = require('./models')

const bodyParser = require('body-parser')

app.use(bodyParser.json())

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log(`Connected to the database '${db.url}' !`)
  })
  .catch(err => {
    console.log(`Cannot connect to the database '${db.url}' !`, err)
    process.exit()
  })

app.use(logger('dev'))

require('./routes/movie.routes')(app)

app.get('/', (req, res) => {
  res.json({ message: 'movies backend service is running.' })
})

app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}.`)
})
