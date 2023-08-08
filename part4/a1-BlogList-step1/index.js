const blogsRouter = require('express').Router()
const express = require('express')
const app = express()
require('dotenv').config()

const bodyParser = require('body-parser')

const Blog = require('./models/blog')

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

let = blogs = []

app.use(express.static('build'))
  app.get('/title', (request, response) => {
    response.send('<h1>Blog list backend</h1>')
  })
  app.get('/api/blogs', (request, response) => {
    Blog.find({}).then(blogs => {
    response.json(blogs)
    })
  })

  app.get('/api/blogs/:info', (request, response) => {
    Blog.find({}).then(blogs => {
    numberOfElements = blogs.length
    console.log('Number of elements: ', numberOfElements)
    let dateNow = new Date()
    
    if(numberOfElements === 0){
      return response.status(404).end()
    }else {
      return response.end(`Blog list has info for ${numberOfElements} blogs \r\n\r\n${dateNow}`)
    }
    })  
  }) 

  app.get('/api/blogs/id/:id', (request, response, next) => {
    Blog.findById(request.params.id).then(blog => {
      if(blog) {
        response.json(blog.toJSON())
      }
      else {
        response.status(204).end()
      }
    })
    .catch(error => next(error))
  })

  app.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
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

  app.put('/api/blogs/:id', (request, response, next) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog.toJSON())
      })
      .catch(error => next(error))
  })

  app.post('/api/blogs', (request, response, next) => {
    const body = request.body
    console.log('value of body:', body)

    const checkTitle = blogs.find(blog => blog.title.toLowerCase() === body.title.toLowerCase())

    if (!body.title && body.author) {
      return response.status(400).json({ 
        error: 'Title is missing' 
      })
    }else if(body.title && !body.author){
      return response.status(400).json({ 
        error: 'Author name is missing' 
      })
    }else if(checkTitle){
      return response.status(400).json({ 
        error: 'Title is already in the blogs, title must be unique' 
      })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
    blog.save().then(savedBlog => {
      response.json(savedBlog.toJSON())
    })
    .catch(error => next(error))
  })
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if ((error.name === 'ValidationError') || (error.number === 'ValidationError')) {    
      return response.status(400).json({ error: error.message })  
    }


    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

