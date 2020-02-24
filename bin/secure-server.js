const fs = require('fs')
// const port = process.env.PORT

const https = require('https').createServer({
    key: fs.readFileSync('./public/privkey.pem'),
    cert: fs.readFileSync('./public/fullchain.pem')
},require('../app'))
.listen(443)