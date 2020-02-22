const server = require('http').createServer(require('../app'))
const port = process.env.PORT || 3004
server.listen(port, ()=>{
    console.log('server listening on port', port);
})