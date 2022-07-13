const express = require('express')
const { engine } = require('express-handlebars')
const dotenv = require('dotenv').config()

const exchangeRateApi = require('./lib/exchangeRateApi')
const handlers = require('./lib/handlers')

const app = express();
const port = process.env.PORT || 3000

app.engine('handlebars', engine({
    deafultLayout: 'main'
}))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', handlers.index)

// REST API
app.get('/exchange', handlers.api.exchange)

app.listen(port, () => {
    exchangeRateApi.getDataByApi()
    console.log(`Server started on port : ${port}`)
})