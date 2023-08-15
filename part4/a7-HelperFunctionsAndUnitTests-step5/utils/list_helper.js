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
  mostLikes
}
 
