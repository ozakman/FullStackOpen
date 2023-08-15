const favoriteBlog = (blogs) => {
  return blogs.length === 0
  ? {}
  : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes ? blog.likes : maxLikes, blogs[0].likes)
}

module.exports = {
  favoriteBlog
}
 
