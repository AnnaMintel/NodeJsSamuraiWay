import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  const a = 4;
  if (a > 5) {
    res.send('ok')
  } else {
    res.send('Hello Woooooorlddd!')
  }
  
})

app.get('/users', (req, res) => {
  res.send('Hello Users!')
})

app.post('/', (req, res) => {
  res.send('We have created user')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})