const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  //Lisätään sopiva käyttäjän tietojen populointi bloggien yhteyteen:
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

//Apufunktio getTokenFrom eristää tokenin Authorization-headerista.
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  //Apufunktio getTokenFrom eristää tokenin headerista authorization.
  const token = getTokenFrom(request)

  try {
    //Tokenin oikeellisuus varmistetaan metodilla jwt.verify.
    //Metodi myös dekoodaa tokenin, eli palauttaa olion, jonka perusteella token on laadittu.
    //Tokenista dekoodatun olion sisällä on kentät username ja id eli se kertoo palvelimelle
    //kuka pyynnön on tehnyt.
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log('decodedToken: ', decodedToken)
    //Jos tokenia ei ole tai tokenista dekoodattu olio ei sisällä käyttäjän identiteettiä
    //(eli decodedToken.id ei ole määritelty), palautetaan virheestä kertova statuskoodi 401
    //unauthorized ja kerrotaan syy vastauksen bodyssä:
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    //const user = await User.findById(body.userId)
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments,
      user: user._id,
    })

    const savedBlog = await blog.save()
    logger.info(
      `added the blog with the title "${blog.title}" to the blog list`
    )
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    logger.info(`blog linked to user: ${user.username} `)
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  //Apufunktio getTokenFrom eristää tokenin headerista authorization.
  const token = getTokenFrom(request)

  console.log('Value of token is: ', token)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  console.log('Value of decoded token is: ', decodedToken)

  const user = await User.findById(decodedToken.id)

  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user._id.toString() === user._id.toString())
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  if (!body.likes) {
    body.likes = 0
  }

  if (!body.comments) {
    body.comments = []
  }

  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blogToUpdate = await Blog.findById(request.params.id)

  if (blogToUpdate.user._id.toString() === user._id.toString()) {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      comments: body.comments,
    }
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        blog,
        { new: true }
      )
      logger.info(`blog ${blog.title} successsfully updated`)
      response.json(updatedBlog.toJSON())
    } catch (exception) {
      next(exception)
    }
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }

  /*
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
*/
})

module.exports = blogsRouter
