const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())


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

  const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
      console.log('value of maxId + 1:', maxId + 1)
    return maxId + 1
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log('value of body:', body)

    if (!body.name || !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    console.log('value of person:', person)
    persons = persons.concat(person)

    response.json(person)
  })

  const PORT = 3001
  app.listen(PORT)
  console.log(`Server running on port ${PORT}`)