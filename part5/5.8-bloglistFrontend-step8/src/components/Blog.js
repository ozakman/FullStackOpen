import React , { useState } from 'react'

const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [isFullHeigth, setIsFullHeigth] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogOwner = blogObject.user.name

  return (
    <div style={{ 'height': `${isFullHeigth ? '100%' : '10%'}` }}> 
      <div style={blogStyle} className='blog'>
        <div>    
          <div onClick={toggleVisibility}>{blog.title} {blog.author}</div>   
        </div>
        <div style={showWhenVisible}>
          <p>{blog.title}</p>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>{blogObject.likes}  likes<button id='like-button' onClick={increaseLikes}>like</button></p>
          <p>added by {blogOwner}</p>
        </div>
      </div>
    </div>     
  )
}

export default Blog
