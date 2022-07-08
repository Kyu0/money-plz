const express = require('express')
const { engine } = require('express-handlebars')
const dotenv = require('dotenv').config()

const pageHandlers = require('./lib/pageHandlers')

const app = express();
const port = process.env.PORT || 3000

app.engine('handlebars', engine({
    deafultLayout: 'main'
}))

app.set('view engine', 'handlebars')
app.set('views', './views')

app.get('/', pageHandlers.index)

app.listen(port, () => {
    console.log(`Server started on port : ${port}`)
})