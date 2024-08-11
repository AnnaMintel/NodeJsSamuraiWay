const http = require('http')


const server = http.createServer((request, response) => {
    response.write('Hello world')
    response.end()
})

server.listen(3003)