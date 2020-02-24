const fs = require('fs')
const port = process.env.PORT

const https = require('https').createServer({
    key: fs.readFileSync('/home/jap_hendy_wijaya/KeyPoint/server/bin/public/privkey.pem'),
    cert: fs.readFileSync('/home/jap_hendy_wijaya/KeyPoint/server/bin/public/fullchain.pem')
},require('../app'))
.listen(443, ()=>{
console.log('secure server is running')
})
