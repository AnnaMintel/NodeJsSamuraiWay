const http = require('http')

let requestsCounter = 0

const server = http.createServer((request, response) => {

    request.url !== '/favicon.ico' && requestsCounter++ 

    switch (request.url){
        case '/students':
            response.write('STUDENTS')
            break;
        case '/':    
        case '/courses':
            response.write('ENGLISH + GERMAN')
            break; 
        default:
            response.write('404 not found')
    }
    response.write(' number: ' + requestsCounter)

    response.end()
})

server.listen(3003)