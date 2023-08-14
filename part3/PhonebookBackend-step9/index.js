const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
app.use(morgan('tiny'))

app.use(morgan(function (tokens, request, response) {
  morgan.token('jsoncontent', function (request, response) {return JSON.stringify(request.body) })
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    tokens.jsoncontent(request, response)
  ].join(' ')
}))

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

app.use(express.static('build'))

  app.get('/title', (request, response) => {
    response.send('<h1>Puhelinluettelon backend</h1>')
  })

  app.get('/api/persons', (request, response) => {
    console.log(persons)
    return response.json(persons)
  })

  app.get('/:info', (request, response) => {
    const numberOfElements = persons.length
    console.log('numberOfElements: ', numberOfElements)

    const dateNow = new Date()

    if(numberOfElements === 0){
      return response.status(404).end()
    }else{
      return response.end(`Phonebook has info for ${numberOfElements} people \r\n\r\n${dateNow}`)
    }
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)

    console.log(person)

    if(person){
      return response.json(person)
    }else{
      return response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log(persons)
    if(persons){
      response.json(persons)
    }else{
      response.status(204).end()
    }
  })

  const generateRandomId = () => {
    const max = 12765
    const min = 101
    return Math.floor(Math.random() * (max - min) + min)
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log('value of body:', body)

    const checkName = persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())

    if (!body.name && body.number) {
      return response.status(400).json({ 
        error: 'Person name is missing' 
      })
    }else if(body.name && !body.number){
      return response.status(400).json({ 
        error: 'Phone number is missing' 
      })
    }else if(checkName){
      return response.status(400).json({ 
        error: 'Name is already in the phonebook, name must be unique' 
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateRandomId(),
    }
    console.log('value of person:', person)
    persons = persons.concat(person)

    response.json(person)
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

