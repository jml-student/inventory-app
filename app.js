require('dotenv').config()
const express = require('express')
const app = express()
const path = require('node:path')
const { indexRouter } = require('./routes/indexRouter')
const { inventoryRouter } = require('./routes/inventoryRouter')
const { settingsRouter } = require('./routes/settingsRouter')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter)
//app.use('/inventory', inventoryRouter)
//app.use('/settings', settingsRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
