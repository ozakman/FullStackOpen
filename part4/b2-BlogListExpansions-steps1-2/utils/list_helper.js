const totalLikes = (blogs) => {
  return blogs.length === 0
  ? 0
  : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0
  ? {}
  : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes ? blog.likes : maxLikes, blogs[0].likes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
      return {}
  } else {
      let authorCounts = blogs.reduce((authorCount, blog) => {
          authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
          return authorCount
      }, {})
      let maxCount = Math.max(...Object.values(authorCounts))
      let mostFrequent = Object.keys(authorCounts).filter(author => authorCounts[author] === maxCount)
      return {
          author: mostFrequent[0],
          blogs: maxCount
      }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
      return {}
  } else {
      let likesCounts = blogs.reduce((likesCount, blog) => {
          likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
          return likesCount
      }, {})
      let maxCount = Math.max(...Object.values(likesCounts))
      let mostLiked = Object.keys(likesCounts).filter(author => likesCounts[author] === maxCount)
      return {
          author: mostLiked[0],
          likes: maxCount
      }
  }
}

module.exports = {
  totalLikes, favoriteBlog, mostBlogs, mostLikes
}


















/*
const Blog = require('../models/blog')

const initialBlogs = [
  {
    id:"5a422a851b54a676234d17f7",
    title:"React patterns",
    author:"Michael Chan",
    url:"https://reactpatterns.com/",
    likes:7
  },
  {
    id:"5a422aa71b54a676234d17f8",
    title:"Go To Statement Considered Harmful",
    author:"Edsger W. Dijkstra",
    url:"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes:5
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb//, usersInDb
}









const totalBlogs = (blogs) => {
  return blogs.length === 0
  ? 0
  : blogs.reduce((sum, blog) => sum + blog, 0)
}


/*
const totalLikes = (blogs) => {
  return blogs.length === 0
  ? 0
  : blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
*/
/*
const favoriteBlog = (blogs) => {
  return blogs.length === 0
  ? {}
  : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes ? blog.likes : maxLikes, blogs[0].likes)
}
*/
/*
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
      return {}
  } else {
      let authorCounts = blogs.reduce((authorCount, blog) => {
          authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
          return authorCount
      }, {})
      let maxCount = Math.max(...Object.values(authorCounts))
      let mostFrequent = Object.keys(authorCounts).filter(author => authorCounts[author] === maxCount)
      return {
          author: mostFrequent[0],
          blogs: maxCount
      }
  }
}
*/

/*
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
      return {}
  } else {
      let likesCounts = blogs.reduce((likesCount, blog) => {
          likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
          return likesCount
      }, {})
      let maxCount = Math.max(...Object.values(likesCounts))
      let mostLiked = Object.keys(likesCounts).filter(author => likesCounts[author] === maxCount)
      return {
          author: mostLiked[0],
          likes: maxCount
      }
  }
}
*/
/*
module.exports = {
  //totalLikes, favoriteBlog, mostBlogs, mostLikes
  //mostLikes
  totalBlogs
}
*/
