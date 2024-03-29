 const blogsRouter = require('express').Router()
 const Blog = require('../models/blog')
 
 blogsRouter.get('/', (request, response) => {
   Blog.find({}).then(blogs => {
     response.json(blogs.map(blog => blog.toJSON()))
   })
 })
 
 blogsRouter.get('/title', (request, response) => {
    response.send('<h1>Blog list backend</h1>')
 })
 
 blogsRouter.get('/:id', (request, response, next) => {
   Blog.findById(request.params.id)
     .then(blog => {
       if (blog) {
         response.json(blog.toJSON())
       } else {
         response.status(404).end()
       }
     })
     .catch(error => next(error))
 })
 
 blogsRouter.post('/', (request, response, next) => {
   const body = request.body
 
   const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
   })
 
   blog.save()
     .then(savedBlog => {
       response.json(savedBlog.toJSON())
     })
     .catch(error => next(error))
 })
 
 blogsRouter.delete('/:id', (request, response, next) => {
   Blog.findByIdAndRemove(request.params.id)
     .then(() => {
       response.status(204).end()
     })
     .catch(error => next(error))
 })
 
 blogsRouter.put('/:id', (request, response, next) => {
   const body = request.body
 
   const note = {
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
 
 module.exports = blogsRouter