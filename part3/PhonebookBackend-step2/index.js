const express = require('express')
const app = express()


let = persons = [
  { 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": 1
  },
  { 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": 2
  },
  { 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": 3
  },
  { 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": 4
  }
]

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/persons', (request, response) => {
    console.log(persons)
    response.json(persons)
  })

  app.get('/:info', (request, response) => {
    const numberOfElements = persons.length
    console.log('numberOfElements: ', numberOfElements)

    const dateNow = new Date()

    if(numberOfElements === 0){
      /* Since no data is attached to the response, we use the status 
         method for setting the status, and the end method for responding 
         to the request without sending any data. */
      return response.status(404).end()
    }else{
      return response.end(`Phonebook has info for ${numberOfElements} people \r\n\r\n${dateNow}`)
    }
  })

  const PORT = 3001
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)