
                            /* FRONTEND REQUESTS */
//get
fetch('http://localhost:3003/api/users/323/books/123', {method: 'GET'}) //URI PARAMETERS
fetch('http://localhost:3003/api/books?year=2022&limit=100&sort=title', {method: 'GET'}) //QUERY PARAMETERS

//delete
fetch('http://localhost:3003/api/users/323/books/123', {method: 'DELETE'}) // DELETE BOOK
fetch('http://localhost:3003/api/users/555', {method: 'DELETE'}) // DELETE USER
fetch('http://localhost:3003/api/books?year=2022', {method: 'DELETE'}) // DELETE ALL 2022 YEAR BOOKS

//post
fetch('http://localhost:3003/api/users/323/books', {method: 'POST', body: JSON.stringify({
    title: 'JS', author: 'Helen Brown'
}) }) // CREATE NEW OBJECT AND SEND BODY
fetch('http://localhost:3003/api/users/323/books', {method: 'POST', body: JSON.stringify({
    title: 'JS', author: 'Helen Brown'
}), headers: {"Content-type": "application/json" } }) 

//put
// patch VS put: when we send put we should write down in body all the parameters even if we update only one
fetch('http://localhost:3003/api/users/323/books/32', {method: 'PUT', body: JSON.stringify({
    title: 'EASY JS', author: 'Helen Morgan', year: 2022
}) }) // CREATE NEW OBJECT AND SEND BODY

//patch
// patch VS put: when we send patch we should write down in body ONLY parameters that we want to update
fetch('http://localhost:3003/api/users/323/books/32', {method: 'PUT', body: JSON.stringify({
    title: 'EASY JS', author: 'Helen Morgan'
}) }) 

