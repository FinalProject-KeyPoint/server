const server = require('http').createServer(require('../app'))
const port = 3000
server.listen(port, ()=>{
    console.log('server listening on port', port);
})