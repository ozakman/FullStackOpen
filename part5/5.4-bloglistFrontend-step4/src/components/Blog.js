import React from 'react'

const Blog = (props) => {
  const blog = props.blog
  return (  
    <div>    
      <p>{blog.title} - {blog.author} </p>
    </div>  
  )
}

export default Blog
