const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

const Person = require('./models/person')

app.use(bodyParser.json())
const cors = require('cors')

app.use(cors())

const morgan = require('morgan')

//tiny configuration with morgan middleware
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


let = persons = []

app.use(express.static('build'))

  app.get('/', (request, response) => {
    response.send('<h1>Puhelinluettelon backend</h1>')
  })

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
    })
  })

  app.get('/api/persons/:info', (request, response) => {
    Person.find({}).then(persons => {
    numberOfElements = persons.length
    console.log('Number of elements: ', numberOfElements)
    let dateNow = new Date()
    
    if(numberOfElements === 0){
      return response.status(404).end()
    }else {
      return response.end(`Phonebook has info for ${numberOfElements} people \r\n\r\n${dateNow}`)
    }
    })  
  })

  app.get('/api/persons/id/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
      if(person) {
        response.json(person.toJSON())
      }
      else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })
  
  const generateRandomId = () => {
    const max = 12765
    const min = 101
    return Math.floor(Math.random() * (max - min) + min)
  }

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }
  
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })

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
    
    const person = new Person({
      name: body.name,
      number: body.number,
    })
  
    person.save().then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

  const PORT = process.env.PORT || 3001

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

