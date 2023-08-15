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

module.exports = {
  mostBlogs
}
 
