if(process.env.NODE_ENV === 'development')
{
    require('dotenv').config()
    require('./config/mongoDev')
}
else if(process.env.NODE_ENV === 'production')
{
    require('dotenv').config()
    require('./config/mongoProd')
}

const express = require('express')
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./bin/public'))
app.use(require('cors')())
app.use(require('morgan')('combined'))

app.use(require('./router'))
app.use(require('./middleware/errorHandler'))

module.exports = app