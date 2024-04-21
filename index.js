const express = require('express')
const fs = require('fs')
const EventEmitter = require('events')
const port = 3000
const app = express()
const path = require('path')

app.use(express.static('public'))
app.use(express.json())

app.get('/api/quotes/getAll', (req, res) => {
  const address = path.resolve('database' + '/quotes.json')
  fs.readFile(address, (err, data) => {
    if(err) {
      res.status(500).send({'msg': 'internal server error'})  
    } else {
      data = JSON.parse(data)  
      res.status(200).send({msg: data})
    }
  })
})

let generatedQuoteId = null
app.get('/api/quotes/get', (req, res) => {
  const address = path.resolve('database' + '/quotes.json')
  fs.readFile(address, (err, data) => {
    if(err) {
      res.status(500).send({'msg': 'internal server error'})  
    } else {
      data = JSON.parse(data) 
      let randomNumber = Math.floor(Math.random() * (data.length - 1 + 1)) + 1

      do
        randomNumber = Math.floor(Math.random() * (data.length - 1 + 1)) + 1
      while (generatedQuoteId === randomNumber);

      generatedQuoteId = randomNumber
      let quote = data[randomNumber - 1]
      res.status(200).send(quote)
    }
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})