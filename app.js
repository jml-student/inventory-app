require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('node:path')
const populateDb = require('./db/populatedb')
const indexRouter = require('./routes/indexRouter')
const registerRouter = require('./routes/registerRouter')
const homeRouter = require('./routes/homeRouter')
const vaultRouter = require('./routes/vaultRouter')
//const { settingsRouter } = require('./routes/settingsRouter')

const init = async () => {
  try {
    await populateDb()
    console.log('Database seeded successfully')

    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000')
    })
  } catch (err) {
    console.error('Error populating the database:', err)
  }
}
init()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/home', homeRouter)
app.use('/home/:symbol', homeRouter)
app.use('/vault', vaultRouter)
//app.use('/settings', settingsRouter)
