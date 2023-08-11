const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const helper = require('./blogTest_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const noteObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0]._id).toBeDefined()
  })

  test('A valid blog can be added ', async () => {
    const newBlog = {
      title:"Canonical string reduction",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'Canonical string reduction'
    )
  })

  test('If the likes property is missing, it will default to 0 ', async () => {
    const newBlog = {
      title:"First class tests",
      author:"Robert C. Martin",
      url:"http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = await blogsAtEnd.find(blog => blog.title === "First class tests")
    expect(addedBlog.likes === 0)
  })

  test('sovellus palauttaa oikean määrän JSON-muotoisia blogeja', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
    console.log('Bloggien määrä: ', helper.initialBlogs.length)
  })

  test('delete a single blog post resource', async () => {
    const newBlog = {
      title:"The best blog ever",
      author:"Me",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)
  })

  test('update the information of an individual blog post', async () => {

    const newBlog = {
      title:"Masterpiece",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)

    const allBlogs = await helper.blogsInDb()
    const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)

    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const foundBlog = blogsAtEnd.find(blog => blog.likes === 13)
    expect(foundBlog.likes).toBe(13)
  })


afterAll(() => {
  mongoose.connection.close()
})
