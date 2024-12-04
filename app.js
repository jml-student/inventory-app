require('dotenv').config()
const express = require('express')
const app = express()
const path = require('node:path')
const { populateDb } = require('./db/populatedb')
const { indexRouter } = require('./routes/indexRouter')
const { vaultRouter } = require('./routes/vaultRouter')
const { settingsRouter } = require('./routes/settingsRouter')
const port = process.env.PORT || 3000

const callPopulateDb = async () => {
  await populateDb()
}

callPopulateDb()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
app.use('/:symbol', indexRouter)
app.use('/vault', vaultRouter)
//app.use('/settings', settingsRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
